import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { ThemeContext } from "../Contexts/ThemeContext";
import { useContext } from "react";

export default function Navbar() {
  const navigation = useNavigation();
  const { themeHandler, currentMode } = useContext(ThemeContext);
  const isLight = currentMode === "false";

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: isLight ? "#EAF1FF" : "#090F1E",
          borderBottomColor: isLight ? "#C7D9FF" : "#1C294A",
        },
      ]}
    >
      <Text style={[styles.logo, { color: isLight ? "#0B1220" : "#E7EEFF" }]}>TODO•X</Text>

      <Pressable onPress={themeHandler} style={({ pressed }) => [styles.modeButton, pressed && styles.pressed]}>
        <Text style={[styles.modeText, { color: isLight ? "#1C3FAA" : "#9BB0FF" }]}>
          {isLight ? "Dark Mode" : "Light Mode"}
        </Text>
      </Pressable>

      <View style={styles.links}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Text style={[styles.linkText, { color: isLight ? "#102452" : "#C7D6FF" }]}>Home</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("About")}>
          <Text style={[styles.linkText, { color: isLight ? "#102452" : "#C7D6FF" }]}>About</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  logo: {
    fontWeight: "900",
    letterSpacing: 1,
  },
  modeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: "rgba(111,139,255,0.15)",
  },
  modeText: {
    fontWeight: "700",
    fontSize: 12,
  },
  links: {
    flexDirection: "row",
    gap: 14,
  },
  linkText: {
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.75,
  },
});
