import React, { useState } from "react";
import Converter from "./components/Converter";
import DarkModeToggle from "./components/DarkModeToggle";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <Converter />
    </div>
  );
};

export default App;
