import React, { useState } from "react";
import {
  Box,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  CssBaseline,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  AttachMoney,
  CurrencyBitcoin,
  Euro,
  CurrencyExchange,
} from "@mui/icons-material";

const App = () => {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [price, setPrice] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Define themes for light and dark modes
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#1976d2",
      },
    },
  });

  // Icons mapping for currencies
  const currencyIcons = {
    USD: <AttachMoney fontSize="large" />,
    BTC: <CurrencyBitcoin fontSize="large" />,
    ETH: <CurrencyExchange fontSize="large" />,
    EUR: <Euro fontSize="large" />,
  };

  const handleConvert = () => {
    if (!fromCurrency || !toCurrency) {
      alert("Please select both currencies.");
      return;
    }

    // Simulate fetching data for now
    setPrice(Math.random().toFixed(4)); // Replace with actual contract call
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          gap: 3,
          textAlign: "center",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Currency Converter
        </Typography>

        {/* From Currency Selector */}
        <FormControl fullWidth sx={{ maxWidth: 300 }}>
          <InputLabel id="from-currency-label">From</InputLabel>
          <Select
            labelId="from-currency-label"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="BTC">BTC</MenuItem>
            <MenuItem value="ETH">ETH</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
          </Select>
        </FormControl>

        {/* To Currency Selector */}
        <FormControl fullWidth sx={{ maxWidth: 300 }}>
          <InputLabel id="to-currency-label">To</InputLabel>
          <Select
            labelId="to-currency-label"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="BTC">BTC</MenuItem>
            <MenuItem value="ETH">ETH</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
          </Select>
        </FormControl>

        {/* Convert Button */}
        <Button
          variant="contained"
          size="large"
          onClick={handleConvert}
          sx={{
            mt: 2,
            px: 5,
          }}
        >
          Convert
        </Button>

        {/* Conversion Result */}
        {price && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              maxWidth: 300,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="h6">
              {fromCurrency}/{toCurrency} → {price}
            </Typography>
            {currencyIcons[fromCurrency]}
          </Box>
        )}

        {/* Dark Mode Toggle */}
        <Button
          variant="outlined"
          onClick={() => setDarkMode((prev) => !prev)}
          sx={{ mt: 3 }}
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default App;
