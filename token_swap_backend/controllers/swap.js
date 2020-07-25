const web3 = require('./web3');
const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "trxAddress",
				"type": "string"
			}
		],
		"name": "storeAddress",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isStored",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "storedAddress",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
const contractAddress = "0x649db4f28bE891B87dea9759c2E4Bbf88a50E572"
const contract = new web3.eth.Contract (abi, contractAddress);
module.exports.swapContract = contract;
module.exports.contractAddress=contractAddress;
