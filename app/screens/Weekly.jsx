import { useContext, useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../Contexts/ThemeContext";
import { useTodos } from "../hooks/useTodos";

const hoursSince = (isoDate) => {
  const timestamp = Date.parse(isoDate);

  if (Number.isNaN(timestamp)) {
    return null;
  }

  return Math.max(0, Math.floor((Date.now() - timestamp) / (1000 * 60 * 60)));
};

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
    metricRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    metricCard: {
      minWidth: 140,
      flexGrow: 1,
      borderRadius: 18,
      padding: 16,
      backgroundColor: palette.surfaceAlt,
      borderWidth: 1,
      borderColor: palette.border,
      gap: 4,
    },
    metricValue: {
      fontSize: 24,
      fontWeight: "900",
      color: palette.text,
    },
    metricLabel: {
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: 1.2,
      color: palette.textMuted,
      fontWeight: "700",
    },
    card: {
      borderRadius: 20,
      padding: 18,
      backgroundColor: palette.surfaceAlt,
      borderWidth: 1,
      borderColor: palette.border,
      gap: 10,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "800",
      color: palette.text,
    },
    cardText: {
      fontSize: 14,
      lineHeight: 21,
      color: palette.textMuted,
    },
    laneRow: {
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.border,
      backgroundColor: palette.surface,
      padding: 12,
      gap: 4,
    },
    laneLabel: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 1.1,
      color: palette.textMuted,
      fontWeight: "700",
    },
    laneValue: {
      fontSize: 16,
      color: palette.text,
      fontWeight: "800",
    },
  });

export default function Weekly() {
  const { palette } = useContext(ThemeContext);
  const { todos, isLoading } = useTodos();
  const styles = createStyles(palette);

  const summary = useMemo(() => {
    let dueThisWeek = 0;
    let carryOver = 0;
    let fresh = 0;

    todos.forEach((task) => {
      const hours = hoursSince(task.createdAt);

      if (hours === null) {
        return;
      }

      if (hours >= 72) {
        carryOver += 1;
        return;
      }

      if (hours >= 24) {
        dueThisWeek += 1;
        return;
      }

      fresh += 1;
    });

    return {
      total: todos.length,
      dueThisWeek,
      carryOver,
      fresh,
    };
  }, [todos]);

  const weeklyPlan = [
    `Day 1-2: clear ${summary.carryOver} carry-over task${summary.carryOver === 1 ? "" : "s"}.`,
    `Day 3-4: execute ${summary.dueThisWeek} core task${summary.dueThisWeek === 1 ? "" : "s"}.`,
    `Day 5: refine ${summary.fresh} fresh task${summary.fresh === 1 ? "" : "s"} for next week.`,
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Weekly planning</Text>
        <Text style={styles.title}>Set your weekly rhythm</Text>
        <Text style={styles.description}>
          Turn your current todo backlog into a practical weekly load so execution stays steady and realistic.
        </Text>
      </View>

      <View style={styles.metricRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{String(summary.total).padStart(2, "0")}</Text>
          <Text style={styles.metricLabel}>Total tasks</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{String(summary.carryOver).padStart(2, "0")}</Text>
          <Text style={styles.metricLabel}>Carry-over</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{String(summary.dueThisWeek).padStart(2, "0")}</Text>
          <Text style={styles.metricLabel}>Core this week</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weekly plan lanes</Text>
        {isLoading ? (
          <Text style={styles.cardText}>Building weekly lanes from your live todos...</Text>
        ) : (
          weeklyPlan.map((lane) => (
            <View key={lane} style={styles.laneRow}>
              <Text style={styles.laneLabel}>Plan step</Text>
              <Text style={styles.laneValue}>{lane}</Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Why this helps</Text>
        <Text style={styles.cardText}>
          Weekly framing prevents random task switching. Finish carry-over work first, then reserve capacity for
          current priorities and new tasks.
        </Text>
      </View>
    </ScrollView>
  );
}
