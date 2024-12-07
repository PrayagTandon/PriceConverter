import React from "react";

const DarkModeToggle = ({ darkMode, setDarkMode }) => (
    <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 bg-gray-300 dark:bg-gray-700 rounded"
    >
        {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
);

export default DarkModeToggle;
