import React, { useState } from "react";

const App = () => {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [conversionResult, setConversionResult] = useState(null);

  const handleConversion = () => {
    if (!fromCurrency || !toCurrency) {
      alert("Please select both currencies.");
      return;
    }
    // Mock conversion result for now
    setConversionResult(`${fromCurrency}/${toCurrency} → ${Math.random().toFixed(4)}`);
  };

  return (
    <main className="flex items-center justify-center flex-col min-h-screen bg-gray-100 gap-8">
      {/* Heading */}
      <section className="p-4 rounded-lg font-bold text-3xl text-center">
        <h1 className="pb-2 border-b-4 border-blue-700 text-blue-700">
          Chainlink Price Converter
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          Fetch real-time price conversions using Chainlink data feeds.
        </p>
      </section>

      {/* Select and Radio Buttons */}
      <section className="bg-white shadow-lg p-6 rounded-lg w-80 flex flex-col items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-700">Select Currencies</h2>

        {/* From Currency */}
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="w-full p-3 border rounded-lg text-gray-700"
        >
          <option value="" disabled>
            Select From Currency
          </option>
          <option value="BTC">Bitcoin (BTC)</option>
          <option value="ETH">Ethereum (ETH)</option>
          <option value="USD">US Dollar (USD)</option>
          <option value="EUR">Euro (EUR)</option>
        </select>

        {/* To Currency */}
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="w-full p-3 border rounded-lg text-gray-700"
        >
          <option value="" disabled>
            Select To Currency
          </option>
          <option value="BTC">Bitcoin (BTC)</option>
          <option value="ETH">Ethereum (ETH)</option>
          <option value="USD">US Dollar (USD)</option>
          <option value="EUR">Euro (EUR)</option>
        </select>

        {/* Convert Button */}
        <button
          onClick={handleConversion}
          className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
        >
          Convert
        </button>
      </section>

      {/* Result Section */}
      <section className="bg-green-100 text-green-700 p-4 rounded-lg w-80 shadow">
        {conversionResult ? (
          <p className="text-center text-lg font-semibold">{conversionResult}</p>
        ) : (
          <p className="text-center text-gray-500">Select currencies to see the result here.</p>
        )}
      </section>
    </main>
  );
};

export default App;
