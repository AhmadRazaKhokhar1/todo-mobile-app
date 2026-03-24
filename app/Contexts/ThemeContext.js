import { createContext } from "react";

export const ThemeContext = createContext({
  currentMode: "false",
  isDarkMode: false,
  palette: null,
  themeHandler: () => {},
});
