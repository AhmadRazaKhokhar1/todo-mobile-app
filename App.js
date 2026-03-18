import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./app/screens/Home";
import About from "./app/screens/About";
import Navbar from "./app/components/Navbar";
import { ThemeContext } from "./app/Contexts/ThemeContext";

const Stack = createStackNavigator();
const THEME_STORAGE_KEY = "theme";

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

  return (
    <SafeAreaView style={{ flex: 1, pointerEvents: "auto" }}>
      <ThemeContext.Provider value={{ themeHandler, currentMode }}>
        <NavigationContainer>
          <Navbar />
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="About" component={About} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeContext.Provider>
    </SafeAreaView>
  );
}
