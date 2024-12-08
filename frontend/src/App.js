import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./config";
import { BsMoon, BsSun } from "react-icons/bs";
import { FaBitcoin, FaEthereum, FaDollarSign, FaEuroSign } from "react-icons/fa";
import { SiChainlink } from "react-icons/si";

const App = () => {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [conversionResult, setConversionResult] = useState(null);
  const [supportedPairs, setSupportedPairs] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize Contract
  const getContract = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask to use this app.");
      return null;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  };

  // Fetch Supported Pairs
  const fetchSupportedPairs = async () => {
    try {
      const contract = await getContract();
      if (contract) {
        const pairs = await contract.getSupportedPairs();
        setSupportedPairs(pairs);
      }
    } catch (error) {
      console.error("Error fetching supported pairs:", error);
    }
  };

  // Fetch Latest Price
  const fetchPrice = async () => {
    if (!fromCurrency || !toCurrency) {
      alert("Please select both currencies.");
      return;
    }

    const pair = `${fromCurrency}/${toCurrency}`;
    try {
      const contract = await getContract();
      if (contract) {
        const price = await contract.getLatestPrice(pair);
        setConversionResult(ethers.utils.formatUnits(price, 8)); // Adjust for Chainlink decimals
      }
    } catch (error) {
      console.error("Error fetching price:", error);
      alert("Failed to fetch price. Ensure MetaMask is connected.");
    }
  };

  // Connect Wallet on Load and Fetch Pairs
  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
        } catch (error) {
          console.error("Wallet connection failed:", error);
        }
      } else {
        alert("MetaMask not detected. Please install MetaMask to use this app.");
      }
    };

    connectWallet();
    fetchSupportedPairs();
  }, []);

  // Currency Icons
  const currencyIcons = {
    BTC: <FaBitcoin className="text-yellow-500" />,
    ETH: <FaEthereum className="text-blue-600" />,
    USD: <FaDollarSign className="text-green-500" />,
    EUR: <FaEuroSign className="text-gray-500" />,
  };

  return (
    <main className={`${darkMode ? "dark" : ""} bg-gray-100 dark:bg-gray-900 min-h-screen`}>
      {/* Dark/Light Mode Toggle */}
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow-md"
      >
        {darkMode ? <BsSun className="text-yellow-500" /> : <BsMoon className="text-gray-800" />}
      </button>

      {/* Main Content */}
      <div className="flex items-center justify-center flex-col gap-8 min-h-screen">
        {/* Heading */}
        <section className="p-4 rounded-lg font-bold text-3xl text-center flex items-center gap-3">
          <SiChainlink className="text-blue-700 text-4xl" />
          <div>
            <h1 className="pb-2 border-b-4 border-blue-700 text-blue-700">Chainlink Price Converter</h1>
            <p className="text-gray-600 text-lg mt-2 dark:text-gray-300">
              Fetch real-time price conversions using Chainlink data feeds.
            </p>
          </div>
        </section>

        {/* Select Currencies */}
        <section className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg w-80 flex flex-col items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Select Currencies</h2>

          {/* From Currency */}
          <div className="flex items-center gap-3 w-full">
            <span>{currencyIcons[fromCurrency] || <FaDollarSign className="text-gray-300" />}</span>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full p-3 border rounded-lg text-gray-700 dark:bg-gray-700 dark:text-white"
            >
              <option value="" disabled>
                Select From Currency
              </option>
              {supportedPairs.map((pair) => (
                <option key={pair} value={pair.split("/")[0]}>
                  {pair.split("/")[0]}
                </option>
              ))}
            </select>
          </div>

          {/* To Currency */}
          <div className="flex items-center gap-3 w-full">
            <span>{currencyIcons[toCurrency] || <FaDollarSign className="text-gray-300" />}</span>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full p-3 border rounded-lg text-gray-700 dark:bg-gray-700 dark:text-white"
            >
              <option value="" disabled>
                Select To Currency
              </option>
              {supportedPairs.map((pair) => (
                <option key={pair} value={pair.split("/")[1]}>
                  {pair.split("/")[1]}
                </option>
              ))}
            </select>
          </div>

          {/* Convert Button */}
          <button
            onClick={fetchPrice}
            className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
          >
            Convert
          </button>
        </section>

        {/* Result Section */}
        <section className="bg-green-100 text-green-700 p-4 rounded-lg w-80 shadow dark:bg-green-900 dark:text-green-300">
          {conversionResult ? (
            <p className="text-center text-lg font-semibold">{conversionResult}</p>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Select currencies to see the result here.
            </p>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;


// import React, { useState } from "react";
// import { BsMoon, BsSun } from "react-icons/bs"; // For dark/light mode toggle
// import { FaBitcoin, FaEthereum, FaDollarSign, FaEuroSign } from "react-icons/fa"; // Currency icons
// import { SiChainlink } from "react-icons/si"; // Chainlink logo

// const App = () => {
//   const [fromCurrency, setFromCurrency] = useState("");
//   const [toCurrency, setToCurrency] = useState("");
//   const [conversionResult, setConversionResult] = useState(null);
//   const [darkMode, setDarkMode] = useState(false);

//   const handleConversion = () => {
//     if (!fromCurrency || !toCurrency) {
//       alert("Please select both currencies.");
//       return;
//     }
//     // Mock conversion result for now
//     setConversionResult(`${fromCurrency}/${toCurrency} → ${Math.random().toFixed(4)}`);
//   };

//   const currencyIcons = {
//     BTC: <FaBitcoin className="text-yellow-500" />,
//     ETH: <FaEthereum className="text-blue-600" />,
//     USD: <FaDollarSign className="text-green-500" />,
//     EUR: <FaEuroSign className="text-gray-500" />,
//   };

//   return (
//     <main className={`${darkMode ? "dark" : ""} bg-gray-100 dark:bg-gray-900 min-h-screen`}>
//       {/* Dark/Light Mode Toggle */}
//       <button
//         onClick={() => setDarkMode((prev) => !prev)}
//         className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow-md"
//       >
//         {darkMode ? <BsSun className="text-yellow-500" /> : <BsMoon className="text-gray-800" />}
//       </button>

//       {/* Main Content */}
//       <div className="flex items-center justify-center flex-col gap-8 min-h-screen">
//         {/* Heading */}
//         <section className="p-4 rounded-lg font-bold text-3xl text-center flex items-center gap-3">
//           <SiChainlink className="text-blue-700 text-4xl" />
//           <div>
//             <h1 className="pb-2 border-b-4 border-blue-700 text-blue-700">Chainlink Price Converter</h1>
//             <p className="text-gray-600 text-lg mt-2 dark:text-gray-300">
//               Fetch real-time price conversions using Chainlink data feeds.
//             </p>
//           </div>
//         </section>

//         {/* Select and Radio Buttons */}
//         <section className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg w-80 flex flex-col items-center gap-4">
//           <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Select Currencies</h2>

//           {/* From Currency */}
//           <div className="flex items-center gap-3 w-full">
//             <span>{currencyIcons[fromCurrency] || <FaDollarSign className="text-gray-300" />}</span>
//             <select
//               value={fromCurrency}
//               onChange={(e) => setFromCurrency(e.target.value)}
//               className="w-full p-3 border rounded-lg text-gray-700 dark:bg-gray-700 dark:text-white"
//             >
//               <option value="" disabled>
//                 Select From Currency
//               </option>
//               <option value="BTC">Bitcoin (BTC)</option>
//               <option value="ETH">Ethereum (ETH)</option>
//               <option value="USD">US Dollar (USD)</option>
//               <option value="EUR">Euro (EUR)</option>
//             </select>
//           </div>

//           {/* To Currency */}
//           <div className="flex items-center gap-3 w-full">
//             <span>{currencyIcons[toCurrency] || <FaDollarSign className="text-gray-300" />}</span>
//             <select
//               value={toCurrency}
//               onChange={(e) => setToCurrency(e.target.value)}
//               className="w-full p-3 border rounded-lg text-gray-700 dark:bg-gray-700 dark:text-white"
//             >
//               <option value="" disabled>
//                 Select To Currency
//               </option>
//               <option value="ETH">Ethereum (ETH)</option>
//               <option value="USD">US Dollar (USD)</option>
//             </select>
//           </div>

//           {/* Convert Button */}
//           <button
//             onClick={handleConversion}
//             className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
//           >
//             Convert
//           </button>
//         </section>

//         {/* Result Section */}
//         <section className="bg-green-100 text-green-700 p-4 rounded-lg w-80 shadow dark:bg-green-900 dark:text-green-300">
//           {conversionResult ? (
//             <p className="text-center text-lg font-semibold">{conversionResult}</p>
//           ) : (
//             <p className="text-center text-gray-500 dark:text-gray-400">
//               Select currencies to see the result here.
//             </p>
//           )}
//         </section>
//       </div>
//     </main>
//   );
// };

// export default App;
