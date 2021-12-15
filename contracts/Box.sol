pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Box is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 private _value;

    // Emitted when the stored value changes
    event ValueChanged(uint256 value);

    // Stores a new value in the contract
    function store(uint256 value) public onlyOwner {
        _value = value;
        emit ValueChanged(value);
    }

    // Reads the last stored value
    function retrieve() public payable returns (uint) {
        return msg.value;
    }
}
