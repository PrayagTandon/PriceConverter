import React, { useState } from "react";
import { ethers } from "ethers";
import { MultiPriceDataAddress, MultiPriceDataABI } from "../config";

const Converter = () => {
    const [fromCurrency, setFromCurrency] = useState("");
    const [toCurrency, setToCurrency] = useState("");
    const [price, setPrice] = useState(null);
    const [loading, setLoading] = useState(false);

    const getLatestPrice = async () => {
        if (!fromCurrency || !toCurrency) {
            alert("Please select both currencies.");
            return;
        }
        const pair = `${fromCurrency}/${toCurrency}`;
        setLoading(true);

        try {
            // Connect to Ethereum
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Get contract instance
            const contract = new ethers.Contract(
                MultiPriceDataAddress,
                MultiPriceDataABI,
                signer
            );

            // Fetch the price
            const price = await contract.getLatestPrice(pair);
            setPrice(ethers.utils.formatUnits(price, "ether"));
        } catch (error) {
            console.error("Error fetching price:", error);
            alert("Error fetching price. Ensure contract and wallet are connected.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <h1 className="text-3xl mb-6">Currency Converter</h1>

            {/* From Currency Dropdown */}
            <select
                className="p-3 mb-4 bg-white dark:bg-gray-700 rounded"
                onChange={(e) => setFromCurrency(e.target.value)}
                value={fromCurrency}
            >
                <option value="" disabled>
                    Select From Currency
                </option>
                <option value="USD">USD</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
                <option value="EUR">EUR</option>
            </select>

            {/* To Currency Dropdown */}
            <select
                className="p-3 mb-4 bg-white dark:bg-gray-700 rounded"
                onChange={(e) => setToCurrency(e.target.value)}
                value={toCurrency}
            >
                <option value="" disabled>
                    Select To Currency
                </option>
                <option value="USD">USD</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
                <option value="EUR">EUR</option>
            </select>

            {/* Convert Button */}
            <button
                onClick={getLatestPrice}
                className="px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                disabled={loading}
            >
                {loading ? "Fetching..." : "Convert"}
            </button>

            {/* Display Result */}
            {price && (
                <div className="mt-6 p-4 bg-gray-200 dark:bg-gray-800 rounded">
                    <p className="text-lg">
                        {fromCurrency}/{toCurrency}: {price}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Converter;
