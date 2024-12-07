// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract MultiPriceDataConsumer {
    mapping(string => AggregatorV3Interface) private dataFeeds;
    string[] public supportedPairs;

    constructor() {
        addPair("BTC/USD", 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43);
        addPair("ETH/USD", 0x694AA1769357215DE4FAC081bf1f309aDC325306);
        // Add more pairs here
    }

    function getLatestPrice(string memory pair) external view returns (int) {
        require(address(dataFeeds[pair]) != address(0), "Pair not supported");
        (
            /* uint80 roundID */,
            int price,
            /* uint startedAt */,
            /* uint timeStamp */,
            /* uint80 answeredInRound */
        ) = dataFeeds[pair].latestRoundData();
        return price;
    }

    function addPair(string memory pair, address aggregatorAddress) public {
        require(aggregatorAddress != address(0), "Invalid aggregator address");
        require(address(dataFeeds[pair]) == address(0), "Pair already exists");
        dataFeeds[pair] = AggregatorV3Interface(aggregatorAddress);
        supportedPairs.push(pair);
    }

    function getSupportedPairs() external view returns (string[] memory) {
        return supportedPairs;
    }
}
