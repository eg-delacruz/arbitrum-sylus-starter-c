
// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

abstract contract Etherra {

  mapping(bytes32 hashed => address) public hash_idx;

  function storeHash(bytes32 hash) external virtual returns (bytes32);

  function checkOwnership(bytes32 hash) external view virtual returns (bool);
}
