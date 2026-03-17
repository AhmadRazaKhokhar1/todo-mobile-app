import { SafeAreaView, StatusBar } from "react-native";
import Home from "./app/screens/Home";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import About from "./app/screens/About";
import Navbar from "./app/components/Navbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "./app/Contexts/ThemeContext";
import { useEffect, useState } from "react";

const Stack = createStackNavigator();

export default function App() {
  const [currentMode, setCurrentMode] = useState("false");

  useEffect(() => {
    async function loadTheme() {
      const mode = await AsyncStorage.getItem("theme");
      setCurrentMode(mode ? mode : "false");
    }

    loadTheme();
  }, []);

  async function themeHandler() {
    const mode = await AsyncStorage.getItem("theme");
    const newMode = mode === "true" ? "false" : "true";
    await AsyncStorage.setItem("theme", newMode);
    setCurrentMode(newMode);
  }

  const isLight = currentMode === "false";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isLight ? "#F5F8FF" : "#060912" }}>
      <StatusBar barStyle={isLight ? "dark-content" : "light-content"} />
      <ThemeContext.Provider value={{ themeHandler, currentMode }}>
        <NavigationContainer theme={DefaultTheme}>
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
