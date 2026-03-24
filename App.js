import { useCallback, useEffect, useMemo, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import Home from "./app/screens/Home";
import About from "./app/screens/About";
import Focus from "./app/screens/Focus";
import Insights from "./app/screens/Insights";
import Priorities from "./app/screens/Priorities";
import Planner from "./app/screens/Planner";
import Agenda from "./app/screens/Agenda";
import Capture from "./app/screens/Capture";
import Review from "./app/screens/Review";
import Navbar from "./app/components/Navbar";
import { ThemeContext } from "./app/Contexts/ThemeContext";

const Stack = createStackNavigator();
const THEME_STORAGE_KEY = "theme";

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

export default function App() {
  const [currentMode, setCurrentMode] = useState("false");

  useEffect(() => {
    async function loadTheme() {
      const storedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      setCurrentMode(storedMode ?? "false");
    }

    loadTheme();
  }, []);

  const themeHandler = useCallback(async () => {
    const nextMode = currentMode === "true" ? "false" : "true";
    await AsyncStorage.setItem(THEME_STORAGE_KEY, nextMode);
    setCurrentMode(nextMode);
  }, [currentMode]);

  const isDarkMode = currentMode === "true";
  const palette = isDarkMode ? darkPalette : lightPalette;
  const themeValue = useMemo(
    () => ({
      themeHandler,
      currentMode,
      isDarkMode,
      palette,
    }),
    [themeHandler, currentMode, isDarkMode, palette]
  );

  return (
    <ThemeContext.Provider value={themeValue}>
      <NavigationContainer theme={palette.navTheme}>
        <SafeAreaView style={[styles.safeArea, { backgroundColor: palette.background }]}>
          <StatusBar style={palette.statusBarStyle} />
          <View style={styles.shell}>
            <View style={[styles.glowOrb, styles.glowOrbTop, { backgroundColor: palette.glowPrimary }]} />
            <View
              style={[styles.glowOrb, styles.glowOrbBottom, { backgroundColor: palette.glowSecondary }]}
            />
            <View
              style={[
                styles.appFrame,
                {
                  backgroundColor: palette.surface,
                  borderColor: palette.border,
                  shadowColor: isDarkMode ? "#020817" : "#4f7cff",
                },
              ]}
            >
              <Navbar />
              <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Focus" component={Focus} />
                <Stack.Screen name="Priorities" component={Priorities} />
                <Stack.Screen name="Planner" component={Planner} />
                <Stack.Screen name="Agenda" component={Agenda} />
                <Stack.Screen name="Capture" component={Capture} />
                <Stack.Screen name="Review" component={Review} />
                <Stack.Screen name="Insights" component={Insights} />
                <Stack.Screen name="About" component={About} />
              </Stack.Navigator>
            </View>
          </View>
        </SafeAreaView>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  shell: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 16,
    overflow: "hidden",
  },
  appFrame: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 28,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 22 },
    shadowOpacity: 0.18,
    shadowRadius: 28,
    elevation: 10,
  },
  glowOrb: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 999,
  },
  glowOrbTop: {
    top: -60,
    right: -60,
  },
  glowOrbBottom: {
    bottom: -70,
    left: -50,
  },
});
