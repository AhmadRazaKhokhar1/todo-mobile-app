import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../Contexts/ThemeContext";

const screenCards = [
  {
    route: "Today",
    title: "Today",
    description: "Get an ordered daily plan: do first, do next, and quick wins to keep momentum.",
  },
  {
    route: "Capture",
    title: "Capture",
    description: "Quickly add incoming tasks using templates so ideas do not interrupt flow.",
  },
  {
    route: "Priorities",
    title: "Priorities",
    description: "Surface your top tasks and lock focus on what creates the most progress.",
  },
  {
    route: "Focus",
    title: "Focus",
    description: "Run a timer sprint to reduce context switching and finish one task deeply.",
  },
  {
    route: "Planner",
    title: "Planner",
    description: "Auto-map tasks into time blocks for a clearer daily execution sequence.",
  },
  {
    route: "Agenda",
    title: "Agenda",
    description: "Split tasks into Now, Next, and Later lanes to enforce practical order.",
  },
  {
    route: "Review",
    title: "Review",
    description: "Audit backlog age, detect stale work, and decide the next best action.",
  },
  {
    route: "QuickWins",
    title: "Quick Wins",
    description: "Identify lightweight tasks you can finish quickly to build momentum.",
  },
  {
    route: "Momentum",
    title: "Momentum",
    description: "Track backlog freshness and sprint load to protect daily execution pace.",
  },
  {
    route: "Insights",
    title: "Insights",
    description: "See workload signals and category breakdowns before planning the next sprint.",
  },
];

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
      fontSize: 14,
      lineHeight: 22,
      color: palette.textMuted,
    },
    grid: {
      gap: 12,
    },
    card: {
      borderRadius: 20,
      padding: 18,
      borderWidth: 1,
      borderColor: palette.border,
      backgroundColor: palette.surfaceAlt,
      gap: 10,
    },
    cardHeading: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "800",
      color: palette.text,
    },
    cardDescription: {
      fontSize: 14,
      lineHeight: 21,
      color: palette.textMuted,
    },
    openChip: {
      borderRadius: 999,
      borderWidth: 1,
      borderColor: palette.accent,
      backgroundColor: palette.accent,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    openChipText: {
      color: "#ffffff",
      fontSize: 12,
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: 0.7,
    },
  });

export default function Screens() {
  const navigation = useNavigation();
  const { palette } = useContext(ThemeContext);
  const styles = createStyles(palette);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Productivity suite</Text>
        <Text style={styles.title}>Open the right screen fast</Text>
        <Text style={styles.description}>
          Use this index to jump directly into planning, focus, review, and insight screens based on what
          you need right now.
        </Text>
      </View>

      <View style={styles.grid}>
        {screenCards.map((screen) => (
          <View key={screen.route} style={styles.card}>
            <View style={styles.cardHeading}>
              <Text style={styles.cardTitle}>{screen.title}</Text>
              <Pressable style={styles.openChip} onPress={() => navigation.navigate(screen.route)}>
                <Text style={styles.openChipText}>Open</Text>
              </Pressable>
            </View>
            <Text style={styles.cardDescription}>{screen.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
