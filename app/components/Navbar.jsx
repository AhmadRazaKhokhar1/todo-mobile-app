import { useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../Contexts/ThemeContext";

export default function Navbar() {
  const navigation = useNavigation();
  const route = useRoute();
  const { themeHandler, isDarkMode, palette } = useContext(ThemeContext);

  const navItems = ["Home", "Focus", "Insights", "Priorities", "About"];

  return (
    <View style={[styles.wrapper, { backgroundColor: palette.surfaceAlt, borderBottomColor: palette.border }]}>
      <View>
        <Text style={[styles.eyebrow, { color: palette.textMuted }]}>Quantum task control</Text>
        <Text style={[styles.brand, { color: palette.text }]}>TODO.NOVA</Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={themeHandler}
          style={[styles.modeChip, { backgroundColor: palette.accentSoft, borderColor: palette.border }]}
        >
          <Text style={[styles.modeLabel, { color: palette.text }]}>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </Text>
        </Pressable>

        <View style={styles.navGroup}>
          {navItems.map((item) => {
            const isActive = route.name === item;

            return (
              <Pressable
                key={item}
                onPress={() => navigation.navigate(item)}
                style={[
                  styles.navPill,
                  {
                    backgroundColor: isActive ? palette.accent : "transparent",
                    borderColor: isActive ? palette.accent : palette.border,
                  },
                ]}
              >
                <Text style={[styles.navText, { color: isActive ? "#ffffff" : palette.textMuted }]}>{item}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomWidth: 1,
    gap: 14,
  },
  eyebrow: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.6,
    marginBottom: 4,
    fontWeight: "700",
  },
  brand: {
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 1,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
  },
  modeChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
  },
  modeLabel: {
    fontSize: 13,
    fontWeight: "800",
  },
  navGroup: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  navPill: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
  },
  navText: {
    fontSize: 13,
    fontWeight: "800",
  },
});
