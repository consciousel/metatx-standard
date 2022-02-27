import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import { ethers } from 'ethers';
// import contract from './contracts/GaslessNFT.json';
import Button from "@material-ui/core/Button";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { Biconomy, getNonce } from "@biconomy/mexa";
import {toBuffer} from "ethereumjs-util";

var utils = require('lazy-cache')(require);
var Web3 = require('web3');
let abi = require('ethereumjs-abi');
const { config } = require("./config");
const contractAddress = config.contract.address;
const contractAbi = config.contract.abi;
const pubAddress = process.env.PUBLIC_KEY;
let util = require('eth-sig-util');
let web3, walletWeb3, nftCount, executeMetaTransactionData, myContract;
const tokenCounter = {};
let chainId = 80001;
let apiKey = config.apiKey.biconomy;
let contract;

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [newTokenURI, setNewTokenURI] = useState("")
  const [loadingMessage, setLoadingMessage] = React.useState(" Loading Application ...");
  const [metaTxEnabled, setMetaTxEnabled] = useState(true);
  const [transactionHash, setTransactionHash] = useState("");
  const [counter, setCounter] = useState("");
  const { ethereum } = window;
 
  useEffect(() => {
    async function init() {
      if (
        typeof window.ethereum !== "undefined" && 
        window.ethereum.isMetaMask
      ) {
        // Ethereum User detected. You can proceed with the provider.
        const provider = window["ethereum"];
        await provider.enable();
        let mumbaiProvider = new Web3.providers.HttpProvider("https://polygon-mumbai.infura.io/v3/ee0a76ad6de8448f933dad70e2d4ad54")
        setLoadingMessage("Initializing Biconomy ...");
        const biconomy = new Biconomy(mumbaiProvider, { apiKey: apiKey, debug: true });

        // This web3 instance will be used to read normally and write contract via meta transactions.
        const web3 = new Web3(biconomy);

        const nftCount = await getNFTCount();
        setCounter(nftCount);

        // This web3 instance will be used to get user signature from connected wallet
        walletWeb3 = new Web3(window.ethereum);
        console.log(walletWeb3)

        biconomy.onEvent(biconomy.READY, () => {
          console.log(loadingMessage)
          // Initialise Dapp here
          contract = new web3.eth.Contract(
            contractAbi,
            contractAddress
          );
          setCurrentAccount(provider.currentAccount);
          getNFTCount();
          getNonce();
          provider.on("accountsChanged", function (accounts){
            setCurrentAccount(accounts[0]);           
          });
        }) .onEvent(biconomy.ERROR, (error, message) => {
          // Handle error while Initializing mexa 
          console.log("Error Initializing Mexa")
        });
      } else {
        showErrorMessage("Metamask not installed")
      };
    }
    init();
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(newTokenURI !== ""){
      showSuccessMessage("URI link available, ready to mint.");
      console.log(newTokenURI);
    } else {
      showErrorMessage("Please insert URI link!")
    }
  };

  const onSubmitWithPrivateKey = async () => {
    if (newTokenURI != "" && contract) {
        setTransactionHash("");
        if (metaTxEnabled) {
            console.log("Sending meta transaction");

            // NOTE: prepend 0x in private key to be used with web3.js
            let privateKey = "11d093f72a5d5e55e48732a02e16250921013f150fed6c1180d065e1224fab5f";
            let userAddress = "0xca880b5262FE5b95902841a44e6caBC3243Ae67b";
            let nonce = await getNonce();
            let functionSignature = contract.methods.mint(newTokenURI).encodeABI();
            let messageToSign = constructMetaTransactionMessage(nonce, chainId, functionSignature, contractAddress);
            
            let {signature} = walletWeb3.eth.accounts.sign("0x" + messageToSign.toString("hex"), privateKey);
            console.log(signature)
            let { r, s, v } = getSignatureParameters(signature);
            let executeMetaTransactionData = contract.methods.executeMetaTransaction(userAddress, functionSignature, r, s, v).encodeABI();
            let txParams = {
              "from": userAddress,
              "to": contractAddress,
              "value": "0x0",
              "gas": "100000",
              "data": executeMetaTransactionData
            };
            const signedTx = await web3.eth.accounts.signTransaction(txParams, `0x${privateKey}`);
            let receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction, (error, txHash) => {
              if (error) {
                return console.error(error);
              }
              console.log("Transaction hash is ", txHash);
              showInfoMessage(`Transaction sent to blockchain with hash ${txHash}`);
            });
            setTransactionHash(receipt.transactionHash);
            showSuccessMessage("Transaction confirmed");
            nftCount = await getNFTCount();
            showInfoMessage(`You have successfully minted NFT number ${nftCount}`)
        } else {
            console.log("Sending normal transaction");
            contract.methods
              .mint(newTokenURI)
              .send({ from: currentAccount })
              .on("transactionHash", function (hash) {
                showInfoMessage(`Transaction sent to blockchain with hash ${hash}`);
              })
              .once("confirmation", function (confirmationNumber, receipt) {
                setTransactionHash(receipt.transactionHash);
                showSuccessMessage("Transaction confirmed");
                getNFTCount();
                showInfoMessage(`You have successfully minted NFT number ${counter}`)
              });
        }
    } else {
        showErrorMessage("Please insert the uri link for your nft media data.");
    }
  }

  // Get count of minted NFTs from network
  const getNFTCount = async() => {
    if (
          typeof window.ethereum !== "undefined" && 
          window.ethereum.isMetaMask
        ) {
      console.log("Wallet exists! Getting minted NFT count!")
    }
    try {
      const provider = new Web3.providers.HttpProvider("https://polygon-mumbai.infura.io/v3/ee0a76ad6de8448f933dad70e2d4ad54")
      walletWeb3 = new Web3(provider);
      const contract = new walletWeb3.eth.Contract( contractAbi, contractAddress,{
        from: currentAccount
      })
      const nftCount = await contract.methods.tokenCounter().call();
      setCounter(nftCount);

      return nftCount     
    } catch (err) {
      console.log(err)
    };
  };

  const getNonce = async() => {
    if (
          typeof window.ethereum !== "undefined" && 
          window.ethereum.isMetaMask
        ) {
      console.log("Wallet exists! Getting latest nonce!")
    }
    try {
      const provider = new Web3.providers.HttpProvider("https://polygon-mumbai.infura.io/v3/ee0a76ad6de8448f933dad70e2d4ad54")
      walletWeb3 = new Web3(provider);
      const users = await ethereum.request({ method: 'eth_accounts' });
      const user = users[0];;
      const nonce = await walletWeb3.eth.getTransactionCount(user , 'latest'); //get latest nonce
      console.log(nonce)

      return nonce     
    } catch (err) {
      console.log(err)
    };
  };

  const checkWalletIsConnected = useCallback(async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  },[])

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }

  const constructMetaTransactionMessage = (nonce, chainId, functionSignature, contractAddress) => {
    return abi.soliditySHA3(
      ["uint256","address","uint256","bytes"],
      [nonce, contractAddress, chainId, toBuffer(functionSignature)]
    );
  }

  const mintNftHandler = async () => {
    console.log(newTokenURI);
    if (newTokenURI !== "" && contract) {
      try {
        if (ethereum) {
          if(metaTxEnabled){
            console.log("Sending meta transaction...");                  
            let userAddress = currentAccount
            let nonce = await getNonce(); //get latest nonce;
            let functionSignature = contract.methods.mint(newTokenURI).encodeABI();
            let messageToSign = constructMetaTransactionMessage(nonce, chainId, functionSignature, contractAddress)

            // NOTE: We are using walletWeb3 here to get signature from connected wallet
            const signature = await walletWeb3.eth.personal.sign(
            "0x" + messageToSign.toString("hex"),
            userAddress
            );

            // Using walletWeb3 here, as it is connected to the wallet where user account is present.
            let { r, s, v } = getSignatureParameters(signature);
            sendSignedTransaction(userAddress, functionSignature, r, s, v);
          } else {
            console.log("Sending normal transaction...");

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = ethers.provider.getSigner();
            const nftContract = new ethers.Contract(contractAddress, contractAbi, signer);

            console.log("Initialize payment");
            let nftTxn = await nftContract.mint(newTokenURI);

            console.log("Mining... please wait");
            await nftTxn.wait();

            console.log(`Mined, see transaction: https://mumbai.polygonscan.com/tx/${nftTxn.hash}`);
            showSuccessMessage("Congrats, your NFT has been minted!")
            refreshPage()
          }
          
        } else {
          console.log("Ethereum object does not exist");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      showErrorMessage("Please enter the URI link for your NFT media.")
    }
  }

  function refreshPage() {
    window.location.reload(false);
  }

  const showErrorMessage = message => {
    NotificationManager.error(message, "Error", 5000);
  };

  const showSuccessMessage = message => {
    NotificationManager.success(message, "Message", 3000);
  };

  const showInfoMessage = message => {
    NotificationManager.info(message, "Info", 3000);
  };

  const connectWalletButton = () => {
    return (
      <>
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
      </>
    )
  }

  const getSignatureParameters = signature => {
    if (!web3.utils.isHexStrict(signature)) {
        throw new Error(
            'Given value "'.concat(signature, '" is not a valid hex string.')
        );
    }
    var r = signature.slice(0, 66);
    var s = "0x".concat(signature.slice(66, 130));
    var v = "0x".concat(signature.slice(130, 132));
    v = web3.utils.hexToNumber(v);
    if (![27, 28].includes(v)) v += 27;
    return {
        r: r,
        s: s,
        v: v
    };
  };

  // Update to retrieve the total number of NFTs minted
  const getMintCount = async() => {
    if (web3 && contract) {
      const tokenCount = await contract.tokenCounter;
      console.log(tokenCount);
      return tokenCount
    }
  };

  const sendSignedTransaction = async (userAddress, functionData, r, s, v) => {
    if (web3 && contract) {
      try {
          let gasLimit = await contract.methods
              .executeMetaTransaction(userAddress, functionData, r, s, v)
              .estimateGas({ from: userAddress });
          let gasPrice = await web3.eth.getGasPrice();
          let tx = contract.methods
              .executeMetaTransaction(userAddress, functionData, r, s, v)
              .send({
                  from: userAddress
              });

          tx.on("transactionHash", function (hash) {
              console.log(`Transaction hash is ${hash}`);
              showInfoMessage(`Transaction sent by relayer with hash ${hash}`);
          }).once("confirmation", function (confirmationNumber, receipt) {
              console.log(receipt);
              setTransactionHash(receipt.transactionHash);
              showSuccessMessage("Transaction confirmed on chain");
              getMintCount()
          });
      } catch (error) {
          console.log(error);
      };
    };
  };

  const mintNftButton = () => {
    console.log(newTokenURI);
    if (newTokenURI !== ""){
      return (
        <>
        <div>
          <div>
            <h1>Ready to mint NFT with URI: {newTokenURI}</h1>
          </div>
          <div>
            <button variant="contained" color="primary" onClick={mintNftHandler} style={{ marginLeft: "10px" }}>
              Mint NFT
            </button>
              <div>
                <Button variant="contained" color="primary" onClick={onSubmitWithPrivateKey} style={{ marginLeft: "10px" }}>
                  Mint NFT (using private key)
                </Button>
              </div>
          </div>
        </div>
        </>
      )
    } else {
      return (
        <>
        <p>Paste the URI link for your NFT media data in the input above to continue.</p>
        </>
      )
    }
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [checkWalletIsConnected])

  return (
    <div className="App">
      <section className="main">
        <div className="header-container">
          <p className="header">🍃 <strong>Mint any NFT with media URI</strong> 🍃</p>
          <p className="sub-text">Upload your files to IPFS, Arweave or any other web3 file storage system, type in the URI link to your media metadata below and mint your NFT.</p>
          {currentAccount ? `Connected with wallet ${currentAccount}` : `Please connect your wallet below to proceed`}
        </div>
      </section>
      <section>
        <div className="submit-container">
          <div className="submit-row">
            <input
              name="TokenURI"
              placeholder="Enter uri link for your NFT media"
              onChange={(e)=>{setNewTokenURI(e.target.value)}}
              value={newTokenURI}
            />
            <Button variant="contained" color="primary" onClick={(e)=>handleSubmit(e)}>
              🢀Link Goes Here
            </Button>
          </div>
        </div>
      </section>
      <section>
        <div className='submit-container'>
          <div>
            {currentAccount ? mintNftButton() : connectWalletButton()}
          </div>
        </div>
      </section>
      <NotificationContainer />
    </div>
  )
}

export default App;