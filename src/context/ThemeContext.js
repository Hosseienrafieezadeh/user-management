import React, { createContext, useState, useEffect, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { lightPalette, darkPalette } from "../components/theme";

const ThemeContext = createContext();

export function ThemeProviderWrapper({ children }) {
  const storedTheme = localStorage.getItem("theme") || "light";
  const [themeMode, setThemeMode] = useState(storedTheme);

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = createTheme(themeMode === "light" ? lightPalette : darkPalette);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  return useContext(ThemeContext);
}
