import { useContext } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "../Contexts/ThemeContext";
import Navbar from "./Navbar";
import RootNavigator from "../navigation/RootNavigator";

export default function AppShell() {
  const { palette, isDarkMode } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={palette.navTheme}>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: palette.background }]}>
        <StatusBar style={palette.statusBarStyle} />
        <View style={styles.shell}>
          <View style={[styles.glowOrb, styles.glowOrbTop, { backgroundColor: palette.glowPrimary }]} />
          <View style={[styles.glowOrb, styles.glowOrbBottom, { backgroundColor: palette.glowSecondary }]} />
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
            <RootNavigator />
          </View>
        </View>
      </SafeAreaView>
    </NavigationContainer>
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
