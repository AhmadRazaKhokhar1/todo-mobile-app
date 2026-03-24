import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_STORAGE_KEY = "theme";

export async function getStoredThemeMode() {
  const mode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
  return mode === "true";
}

export async function setStoredThemeMode(mode) {
  await AsyncStorage.setItem(THEME_STORAGE_KEY, mode ? "true" : "false");
}
