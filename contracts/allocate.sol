pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
contract allocate {
    constructor() public payable{   
    }
    function() payable external {}
    string[] storedData =["QmYantVWYe2itHH68CwL3cqXHM6EwGmxH75nugQiq2uAF9","QmYisfKRSxWx3PKsn7Yfwcy2Hj2EdmWFXLZRpgKziRbwpB","QmSREQmvNEqHjC7CuuWHakLHAdsPFFfecPk5Kv9PTiU2Qb"];
    string[] storedData1=["perfect","home","survivors"];
    address[] storedData2=[0xEDc30Bb67af5C126AF1400991Fa6d2F4B4760B5C,
0xD267cb5E20050289a893F2a832Bd5D6DDBe08820,0x86dED0814431e6dBAA3C86b32094613f3Ed9F3A0];
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
    function set(string memory x, string memory y, address z) public {
        storedData.push(x);
        storedData1.push(y);
        storedData2.push(z);
    }
    function get() public view returns (string[] memory, string[] memory) {
        return (storedData, storedData1);
    }
    function length() public view returns (uint)
    {
        return storedData.length;
    }
}