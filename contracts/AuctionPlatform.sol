pragma solidity ^0.4.24;

contract AuctionPlatform{
    enum NFTStatus{Open, Sold, Unsold}  //商品状态
    uint public Index;  //计数器
    mapping(uint => address) NFTIdInStore;  //商品ID与地址的对应关系
    mapping(address => mapping(uint => NFT)) Stores;  //地址与产品的对应关系
//产品结构体
    struct NFT{
        uint id;
        string name;
        uint StartTime;
        uint EndTime;
        uint StartPrice;
        address HighestBidder;
        uint HighestBid;
        NFTStatus status;
        mapping(address => mapping(bytes32 => Bid)) bids;  //通过Hash值储存NFT信息
    }
//初始化计数器
    constructor() {
        Index = 0;
    }
//竞价结构体
    struct Bid{
        address Bidder;
        uint NFTId;
        uint Value;
        bool revealed;  //是否揭标
    }
    function AddNFTToStore(string memory _name, uint _StartTime, uint _EndTime ,uint _StartPrice) public{
        require(_StartTime < _EndTime,"Startingtime should not be later than endtime");
        Index += 1;
        NFT memory nft = NFT(Index, _name, _StartTime, _EndTime, _StartPrice, 0, 0, NFTStatus.Open);
        Stores[msg.sender][Index] = nft;
        NFTIdInStore[Index] = msg.sender;   
    }
    
    function GetNFT(uint _nftId)  public view returns (uint, string memory, uint, uint, uint, NFTStatus)  {
        NFT memory nft = Stores[NFTIdInStore[_nftId]][_nftId];
        return (nft.id, nft.name, nft.StartTime, nft.EndTime, nft.StartPrice, nft.status);
    }

    function bid(uint _nftId, bytes32 _bid) public payable returns (bool){
        NFT storage nft = Stores[NFTIdInStore[_nftId]][_nftId];
        require(now > nft.StartTime, "The auction has not started yet");
        require(now < nft.EndTime, "The auction is not available now");
        require(msg.value > nft.StartPrice, "Your offer is lower than the startingprice");
        //require(nft.bids[msg.sender][_bid].bidder == 0);
        nft.bids[msg.sender][_bid] = Bid(msg.sender, _nftId, msg.value, false);
        return true;
    }

    function revealBid(uint _nftId, uint _amount, string memory _secret) public{
        NFT storage nft = Stores[NFTIdInStore[_nftId]][_nftId];
        require(now > nft.EndTime);
        bytes32 sealedBid = sha3(_amount, _secret);
        Bid memory bidinfo = nft.bids[msg.sender][sealedBid];
        require(bidinfo.Bidder > 0, "Bidder should exist");
        require(bidinfo.revealed == false, "bid should not be revealed");
        uint refund;
       // uint _amount = StringToUint(_amount);
        if(bidinfo.Value < _amount){
            refund = bidinfo.Value;
        }
        else{
            if(address(nft.HighestBidder) == 0){
                nft.HighestBidder = msg.sender;
                nft.HighestBid = _amount;
                refund = bidinfo.Value - _amount;
            }
            else{
                if(_amount > nft.HighestBid){
                    uint temp;
                    temp = nft.HighestBid;
                    nft.HighestBidder.transfer(nft.HighestBid);
                    nft.HighestBid = _amount;
                    nft.HighestBidder = msg.sender;
                    refund = bidinfo.Value - _amount;
            }
                else{
                    refund = _amount;
                }
            }
        }
        if(refund > 0){
            msg.sender.transfer(refund);
        }
        nft.bids[msg.sender][sealedBid].revealed = true;
    }

    function StringToUint(string memory s) private pure returns(uint){
        bytes memory temp = bytes(s);
        uint result = 0;
        for(uint i = 0; i < temp.length; i++){
            if(temp[i] >= 48 && temp[i] <= 57){
                result = result * 10 + uint(temp[i]) - 48;
            }
        }
        return result;
    }

    function HighestBidderInfo(uint _nftId)public view returns(address,uint){
        NFT memory nft = Stores[NFTIdInStore[_nftId]][_nftId];
        return(nft.HighestBidder, nft.HighestBid);
    }

    function getsha3(uint _amount, string memory _secret) public view returns(bytes32){
        return sha3(_amount, _secret);
    }

    function getcurrenttime() public view returns(uint){
        return now;
    }
}