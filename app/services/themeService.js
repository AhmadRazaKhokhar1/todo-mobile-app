import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_STORAGE_KEY = "theme";

export async function getStoredThemeMode() {
  try {
    const mode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    return mode === "true";
  } catch (error) {
    return false;
  }
}

export async function setStoredThemeMode(mode) {
  try {
    await AsyncStorage.setItem(THEME_STORAGE_KEY, mode ? "true" : "false");
    return true;
  } catch (error) {
    return false;
  }
}
