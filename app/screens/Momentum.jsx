import { useContext, useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../Contexts/ThemeContext";
import { useTodos } from "../hooks/useTodos";

const getAgeHours = (isoDate) => {
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
    paragraph: {
      fontSize: 14,
      lineHeight: 21,
      color: palette.textMuted,
    },
    cueRow: {
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.border,
      backgroundColor: palette.surface,
      padding: 12,
      gap: 6,
    },
    cueLabel: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 1.1,
      color: palette.textMuted,
      fontWeight: "700",
    },
    cueText: {
      fontSize: 15,
      lineHeight: 21,
      color: palette.text,
      fontWeight: "700",
    },
  });

export default function Momentum() {
  const { palette } = useContext(ThemeContext);
  const { todos, isLoading } = useTodos();
  const styles = createStyles(palette);

  const summary = useMemo(() => {
    let fresh = 0;
    let aging = 0;
    let stale = 0;

    todos.forEach((item) => {
      const age = getAgeHours(item.createdAt);

      if (age === null || age < 24) {
        fresh += 1;
        return;
      }

      if (age < 48) {
        aging += 1;
        return;
      }

      stale += 1;
    });

    const tasksPerSprint = 3;
    const sprintEstimate = Math.max(1, Math.ceil(todos.length / tasksPerSprint));
    const focusSignal = stale > 0 ? "Recovery" : aging > 2 ? "Stabilize" : "Build";

    return { fresh, aging, stale, sprintEstimate, focusSignal };
  }, [todos]);

  const dailyCue =
    summary.stale > 0
      ? "Close one stale task first, then run one focus sprint."
      : "Start with one priority task, then clear a quick win to keep pace.";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Momentum tracker</Text>
        <Text style={styles.title}>Keep forward pace each day</Text>
        <Text style={styles.description}>
          Track backlog freshness and sprint load so you can protect execution speed instead of reacting late.
        </Text>
      </View>

      <View style={styles.metricRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{String(summary.fresh).padStart(2, "0")}</Text>
          <Text style={styles.metricLabel}>Fresh tasks</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{String(summary.aging).padStart(2, "0")}</Text>
          <Text style={styles.metricLabel}>Aging (24-48h)</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{String(summary.stale).padStart(2, "0")}</Text>
          <Text style={styles.metricLabel}>Stale (48h+)</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Execution signal</Text>
        {isLoading ? (
          <Text style={styles.paragraph}>Building live momentum signals from your todos...</Text>
        ) : (
          <>
            <Text style={styles.paragraph}>Current mode: {summary.focusSignal}</Text>
            <Text style={styles.paragraph}>
              Estimated focus sprints to clear queue: {summary.sprintEstimate}
            </Text>
            <View style={styles.cueRow}>
              <Text style={styles.cueLabel}>Today cue</Text>
              <Text style={styles.cueText}>{dailyCue}</Text>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}
