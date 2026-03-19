import { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../Contexts/ThemeContext";

const createStyles = (palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.surface,
    },
    content: {
      padding: 18,
      paddingBottom: 28,
      gap: 16,
    },
    hero: {
      borderRadius: 24,
      padding: 20,
      backgroundColor: palette.surfaceAlt,
      borderWidth: 1,
      borderColor: palette.border,
      gap: 10,
    },
    eyebrow: {
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      fontWeight: "700",
      color: palette.textMuted,
    },
    title: {
      fontSize: 28,
      fontWeight: "900",
      color: palette.text,
    },
    description: {
      fontSize: 15,
      lineHeight: 23,
      color: palette.textMuted,
      maxWidth: 720,
    },
    grid: {
      gap: 12,
    },
    card: {
      borderRadius: 20,
      padding: 18,
      backgroundColor: palette.surfaceAlt,
      borderWidth: 1,
      borderColor: palette.border,
      gap: 8,
    },
    cardTitle: {
      fontSize: 17,
      fontWeight: "800",
      color: palette.text,
    },
    cardText: {
      fontSize: 14,
      lineHeight: 22,
      color: palette.textMuted,
    },
  });

export default function About() {
  const { palette } = useContext(ThemeContext);
  const styles = createStyles(palette);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>About the experience</Text>
        <Text style={styles.title}>A sharper interface for daily task control</Text>
        <Text style={styles.description}>
          This refreshed todo app replaces the original basic interface with a cleaner futuristic system.
          It keeps the existing realtime workflow while improving focus, hierarchy, and light/dark mode
          presentation across the entire app shell.
        </Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Realtime by default</Text>
          <Text style={styles.cardText}>
            Tasks still stream from Firestore instantly, so the visual refresh does not sacrifice the live
            collaborative behavior already built into the project.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Designed like a command center</Text>
          <Text style={styles.cardText}>
            Soft-glow framing, elevated cards, data-style labels, and stronger spacing create a more modern
            UI without introducing unnecessary complexity.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Consistent across modes</Text>
          <Text style={styles.cardText}>
            Both light and dark themes now use the same visual system, making navigation and task entry feel
            intentional instead of like separate unfinished layouts.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
