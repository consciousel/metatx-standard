let config = {};
config.contract = {
    address: "0x080Cf810A217BdB2380b99Dd0905534Dc31c9A79",
    abi: [{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x8da5cb5b"},{"constant":true,"inputs":[],"name":"quote","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x999b93af"},{"constant":false,"inputs":[{"internalType":"string","name":"newQuote","type":"string"}],"name":"setQuote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xe3de1703"},{"constant":true,"inputs":[],"name":"getQuote","outputs":[{"internalType":"string","name":"currentQuote","type":"string"},{"internalType":"address","name":"currentOwner","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x171755b1"}]
}

// These values are for kovan network
config.gnosis = {
    proxyFactory : {
        abi: [ { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "contract GnosisSafeProxy", "name": "proxy", "type": "address" } ], "name": "ProxyCreation", "type": "event" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "masterCopy", "type": "address" }, { "internalType": "bytes", "name": "data", "type": "bytes" } ], "name": "createProxy", "outputs": [ { "internalType": "contract GnosisSafeProxy", "name": "proxy", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "proxyRuntimeCode", "outputs": [ { "internalType": "bytes", "name": "", "type": "bytes" } ], "payable": false, "stateMutability": "pure", "type": "function" }, { "constant": true, "inputs": [], "name": "proxyCreationCode", "outputs": [ { "internalType": "bytes", "name": "", "type": "bytes" } ], "payable": false, "stateMutability": "pure", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "_mastercopy", "type": "address" }, { "internalType": "bytes", "name": "initializer", "type": "bytes" }, { "internalType": "uint256", "name": "saltNonce", "type": "uint256" } ], "name": "createProxyWithNonce", "outputs": [ { "internalType": "contract GnosisSafeProxy", "name": "proxy", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "_mastercopy", "type": "address" }, { "internalType": "bytes", "name": "initializer", "type": "bytes" }, { "internalType": "uint256", "name": "saltNonce", "type": "uint256" }, { "internalType": "contract IProxyCreationCallback", "name": "callback", "type": "address" } ], "name": "createProxyWithCallback", "outputs": [ { "internalType": "contract GnosisSafeProxy", "name": "proxy", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "_mastercopy", "type": "address" }, { "internalType": "bytes", "name": "initializer", "type": "bytes" }, { "internalType": "uint256", "name": "saltNonce", "type": "uint256" } ], "name": "calculateCreateProxyWithNonceAddress", "outputs": [ { "internalType": "contract GnosisSafeProxy", "name": "proxy", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" } ],
        address: "0x76E2cFc1F5Fa8F6a5b3fC4c8F4788F0116861F9B"
    },
    safeMasterCopy : {
        abi: [ { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "owner", "type": "address" } ], "name": "AddedOwner", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "bytes32", "name": "approvedHash", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "owner", "type": "address" } ], "name": "ApproveHash", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "masterCopy", "type": "address" } ], "name": "ChangedMasterCopy", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "threshold", "type": "uint256" } ], "name": "ChangedThreshold", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "contract Module", "name": "module", "type": "address" } ], "name": "DisabledModule", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "contract Module", "name": "module", "type": "address" } ], "name": "EnabledModule", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "bytes32", "name": "txHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "payment", "type": "uint256" } ], "name": "ExecutionFailure", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "module", "type": "address" } ], "name": "ExecutionFromModuleFailure", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "module", "type": "address" } ], "name": "ExecutionFromModuleSuccess", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "bytes32", "name": "txHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "payment", "type": "uint256" } ], "name": "ExecutionSuccess", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "owner", "type": "address" } ], "name": "RemovedOwner", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "bytes32", "name": "msgHash", "type": "bytes32" } ], "name": "SignMsg", "type": "event" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "constant": true, "inputs": [], "name": "NAME", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "VERSION", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "_threshold", "type": "uint256" } ], "name": "addOwnerWithThreshold", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "name": "approvedHashes", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "_masterCopy", "type": "address" } ], "name": "changeMasterCopy", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "uint256", "name": "_threshold", "type": "uint256" } ], "name": "changeThreshold", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "contract Module", "name": "prevModule", "type": "address" }, { "internalType": "contract Module", "name": "module", "type": "address" } ], "name": "disableModule", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "domainSeparator", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "contract Module", "name": "module", "type": "address" } ], "name": "enableModule", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "enum Enum.Operation", "name": "operation", "type": "uint8" } ], "name": "execTransactionFromModule", "outputs": [ { "internalType": "bool", "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "enum Enum.Operation", "name": "operation", "type": "uint8" } ], "name": "execTransactionFromModuleReturnData", "outputs": [ { "internalType": "bool", "name": "success", "type": "bool" }, { "internalType": "bytes", "name": "returnData", "type": "bytes" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getModules", "outputs": [ { "internalType": "address[]", "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "start", "type": "address" }, { "internalType": "uint256", "name": "pageSize", "type": "uint256" } ], "name": "getModulesPaginated", "outputs": [ { "internalType": "address[]", "name": "array", "type": "address[]" }, { "internalType": "address", "name": "next", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getOwners", "outputs": [ { "internalType": "address[]", "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getThreshold", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "isOwner", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "nonce", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "prevOwner", "type": "address" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "_threshold", "type": "uint256" } ], "name": "removeOwner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "handler", "type": "address" } ], "name": "setFallbackHandler", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "name": "signedMessages", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "prevOwner", "type": "address" }, { "internalType": "address", "name": "oldOwner", "type": "address" }, { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "swapOwner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address[]", "name": "_owners", "type": "address[]" }, { "internalType": "uint256", "name": "_threshold", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "address", "name": "fallbackHandler", "type": "address" }, { "internalType": "address", "name": "paymentToken", "type": "address" }, { "internalType": "uint256", "name": "payment", "type": "uint256" }, { "internalType": "address payable", "name": "paymentReceiver", "type": "address" } ], "name": "setup", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "enum Enum.Operation", "name": "operation", "type": "uint8" }, { "internalType": "uint256", "name": "safeTxGas", "type": "uint256" }, { "internalType": "uint256", "name": "baseGas", "type": "uint256" }, { "internalType": "uint256", "name": "gasPrice", "type": "uint256" }, { "internalType": "address", "name": "gasToken", "type": "address" }, { "internalType": "address payable", "name": "refundReceiver", "type": "address" }, { "internalType": "bytes", "name": "signatures", "type": "bytes" } ], "name": "execTransaction", "outputs": [ { "internalType": "bool", "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "enum Enum.Operation", "name": "operation", "type": "uint8" } ], "name": "requiredTxGas", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "bytes32", "name": "hashToApprove", "type": "bytes32" } ], "name": "approveHash", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "bytes", "name": "_data", "type": "bytes" } ], "name": "signMessage", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "bytes", "name": "_data", "type": "bytes" }, { "internalType": "bytes", "name": "_signature", "type": "bytes" } ], "name": "isValidSignature", "outputs": [ { "internalType": "bytes4", "name": "", "type": "bytes4" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "bytes", "name": "message", "type": "bytes" } ], "name": "getMessageHash", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "enum Enum.Operation", "name": "operation", "type": "uint8" }, { "internalType": "uint256", "name": "safeTxGas", "type": "uint256" }, { "internalType": "uint256", "name": "baseGas", "type": "uint256" }, { "internalType": "uint256", "name": "gasPrice", "type": "uint256" }, { "internalType": "address", "name": "gasToken", "type": "address" }, { "internalType": "address", "name": "refundReceiver", "type": "address" }, { "internalType": "uint256", "name": "_nonce", "type": "uint256" } ], "name": "encodeTransactionData", "outputs": [ { "internalType": "bytes", "name": "", "type": "bytes" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "enum Enum.Operation", "name": "operation", "type": "uint8" }, { "internalType": "uint256", "name": "safeTxGas", "type": "uint256" }, { "internalType": "uint256", "name": "baseGas", "type": "uint256" }, { "internalType": "uint256", "name": "gasPrice", "type": "uint256" }, { "internalType": "address", "name": "gasToken", "type": "address" }, { "internalType": "address", "name": "refundReceiver", "type": "address" }, { "internalType": "uint256", "name": "_nonce", "type": "uint256" } ], "name": "getTransactionHash", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "view", "type": "function" } ],
        address: "0x34CfAC646f301356fAa8B21e94227e3583Fe3F5F"
    }
}

module.exports = {config}
