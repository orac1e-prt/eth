const abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "Index",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_name",
            "type": "string"
          },
          {
            "name": "_StartTime",
            "type": "uint256"
          },
          {
            "name": "_EndTime",
            "type": "uint256"
          },
          {
            "name": "_StartPrice",
            "type": "uint256"
          }
        ],
        "name": "AddNFTToStore",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_nftId",
            "type": "uint256"
          }
        ],
        "name": "GetNFT",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "uint8"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_nftId",
            "type": "uint256"
          },
          {
            "name": "_bid",
            "type": "bytes32"
          }
        ],
        "name": "bid",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_nftId",
            "type": "uint256"
          },
          {
            "name": "_amount",
            "type": "string"
          },
          {
            "name": "_secret",
            "type": "string"
          }
        ],
        "name": "revealBid",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_nftId",
            "type": "uint256"
          }
        ],
        "name": "HighestBidderInfo",
        "outputs": [
          {
            "name": "",
            "type": "address"
          },
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
];
// 合约地址
var address = "0xC9dF0323Ca0434C35713AF5c72f4C89CBd1b246B";
var option  = {
    from: '0x8ddf05CD113c4A9329461f947f6796a7cFFb5823', // default from address
    gasPrice: '20000000000'
}
module.exports = {
    abi,
    address,
    option,
}