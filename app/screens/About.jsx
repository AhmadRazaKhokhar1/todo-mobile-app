import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../Contexts/ThemeContext";

export default function About() {
  const { currentMode } = useContext(ThemeContext);
  const isLight = currentMode === "false";

  return (
    <View style={[styles.page, { backgroundColor: isLight ? "#F5F8FF" : "#060912" }]}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: isLight ? "#FFFFFF" : "#0E1528",
            borderColor: isLight ? "#D5E2FF" : "#1C294A",
          },
        ]}
      >
        <Text style={[styles.title, { color: isLight ? "#102044" : "#E2EBFF" }]}>ABOUT TODO•X</Text>
        <Text style={[styles.body, { color: isLight ? "#33446F" : "#AABCE3" }]}>
          This app now uses a futuristic interface focused on clarity, speed, and focus. Use Mission Board to add,
          track, and remove tasks quickly with a clean neon-inspired style built for modern productivity.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 18,
  },
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 10,
  },
  body: {
    fontSize: 15,
    lineHeight: 24,
  },
});
