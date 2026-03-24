import { useCallback, useEffect, useMemo, useState } from "react";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { Alert } from "react-native";
import { ThemeContext } from "./ThemeContext";
import { getStoredThemeMode, setStoredThemeMode } from "../services/themeService";

const lightPalette = {
  background: "#f3f7ff",
  surface: "#ffffff",
  surfaceAlt: "#e9f1ff",
  border: "#c6d8ff",
  text: "#10203d",
  textMuted: "#56719f",
  accent: "#4f7cff",
  accentStrong: "#1f4fff",
  accentSoft: "#dce7ff",
  danger: "#ff5f7a",
  success: "#1fc38b",
  glowPrimary: "rgba(79, 124, 255, 0.20)",
  glowSecondary: "rgba(31, 195, 139, 0.16)",
  navTheme: DefaultTheme,
  statusBarStyle: "dark",
};

const darkPalette = {
  background: "#06101f",
  surface: "#0c1a2e",
  surfaceAlt: "#10213b",
  border: "rgba(124, 155, 255, 0.22)",
  text: "#eff5ff",
  textMuted: "#8ea7d0",
  accent: "#6f8dff",
  accentStrong: "#9d7bff",
  accentSoft: "rgba(111, 141, 255, 0.18)",
  danger: "#ff6f91",
  success: "#34d7a1",
  glowPrimary: "rgba(111, 141, 255, 0.24)",
  glowSecondary: "rgba(52, 215, 161, 0.18)",
  navTheme: DarkTheme,
  statusBarStyle: "light",
};

export default function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadTheme() {
      const storedMode = await getStoredThemeMode();

      if (isMounted) {
        setIsDarkMode(storedMode);
      }
    }

    loadTheme();

    return () => {
      isMounted = false;
    };
  }, []);

  const themeHandler = useCallback(async () => {
    const nextMode = !isDarkMode;
    const isSaved = await setStoredThemeMode(nextMode);

    if (!isSaved) {
      Alert.alert("Unable to save theme", "Unable to save theme preference. Please try again.");
    }

    setIsDarkMode(nextMode);
  }, [isDarkMode]);

  const palette = isDarkMode ? darkPalette : lightPalette;
  const value = useMemo(
    () => ({
      themeHandler,
      currentMode: isDarkMode,
      isDarkMode,
      palette,
    }),
    [themeHandler, isDarkMode, palette]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
