var Web3 = require("web3");
// 获取对应的合约的abi与address与私钥与创建合约实例的option
const {abi,address,option} =  require("./abi.js");
// 创建web3对象
var web3 = new Web3();
// 连接到以太坊节点
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
var metacoin =new web3.eth.Contract(abi,address,option);
//
console.log(metacoin);







async function HighestBidderInfo(_nftId){
    let mineCharacter = await metacoin.methods.HighestBidderInfo(_nftId).call();
    return mineCharacter;
}
HighestBidderInfo(1).then((value)=>{
    console.log(value)
})


async function AddNFTToStore (str1, str2,str3,str4,privateKey)
{
    var functionEncode = await metacoin.methods.AddNFTToStore(str1,str2,str3,str4).encodeABI();
    console.log(111);
    var sign = await web3.eth.accounts.signTransaction({
        gas: 500000,
        to: address,
        data: functionEncode,
        // value :"100000000000000000",
    }, privateKey);
    let result = await web3.eth.sendSignedTransaction(sign.rawTransaction);
    return result;
}

AddNFTToStore("1","11","121","1","61aea050702b34e9ba16b069f8e0a683031a068cf881cc9be7248cf1d4f1016c").then((value)=>{
    console.log(value)
})



 module.exports ={
    HighestBidderInfo,
    getsha3,
    getcurrenttime,
    StringToUint,
    revealBid,
    bid,
    GetNFT,
    AddNFTToStore,
 }