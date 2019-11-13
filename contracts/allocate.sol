pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
contract allocate {
    constructor() public payable{   
    }
    function() payable external {}
    string[] storedData =["QmYantVWYe2itHH68CwL3cqXHM6EwGmxH75nugQiq2uAF9","QmYisfKRSxWx3PKsn7Yfwcy2Hj2EdmWFXLZRpgKziRbwpB","QmSREQmvNEqHjC7CuuWHakLHAdsPFFfecPk5Kv9PTiU2Qb"];
    string[] storedData1=["perfect","home","survivors"];
    mapping(address => uint) public count;
    function upVote(address x) public 
    {
        count[x] ++;
    }
    function getUpVote(address x) public view returns(uint)
    {
        return count[x];
    }
    function grant(address payable x) public
    {
        // require(address(this).balance >= 1 ether);
        x.transfer(1 ether);
    }
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
    function set(string memory x, string memory y) public {
        storedData.push(x);
        storedData1.push(y);
    }
    function get() public view returns (string[] memory, string[] memory) {
        return (storedData, storedData1);
    }
    function length() public view returns (uint)
    {
        return storedData.length;
    }
}