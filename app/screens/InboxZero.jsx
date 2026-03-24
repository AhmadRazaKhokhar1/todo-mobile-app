import { useContext, useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../Contexts/ThemeContext";
import { useTodos } from "../hooks/useTodos";

const ageHours = (isoDate) => {
  const timestamp = Date.parse(isoDate);

  if (Number.isNaN(timestamp)) {
    return null;
  }

  return Math.max(0, Math.floor((Date.now() - timestamp) / (1000 * 60 * 60)));
};

const taskScore = (task) => {
  const words = (task.todo || "").trim().split(/\s+/).filter(Boolean).length;
  const hours = ageHours(task.createdAt) ?? 0;

  return hours * 2 + Math.max(0, 8 - words);
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
    stepRow: {
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.border,
      backgroundColor: palette.surface,
      padding: 12,
      gap: 6,
    },
    stepLabel: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 1.1,
      color: palette.textMuted,
      fontWeight: "700",
    },
    stepText: {
      fontSize: 15,
      lineHeight: 21,
      color: palette.text,
      fontWeight: "700",
    },
    stepMeta: {
      fontSize: 13,
      color: palette.textMuted,
      fontWeight: "700",
    },
    paragraph: {
      fontSize: 14,
      lineHeight: 21,
      color: palette.textMuted,
    },
  });

export default function InboxZero() {
  const { palette } = useContext(ThemeContext);
  const { todos, isLoading } = useTodos();
  const styles = createStyles(palette);

  const summary = useMemo(() => {
    const sorted = [...todos].sort((a, b) => taskScore(b) - taskScore(a));
    const staleCount = sorted.filter((task) => (ageHours(task.createdAt) ?? 0) >= 48).length;
    const cleanupList = sorted.slice(0, 4);

    return {
      total: sorted.length,
      staleCount,
      cleanupList,
    };
  }, [todos]);

  const message =
    summary.staleCount > 0
      ? "Start by clearing one stale task, then close one quick item to keep progress visible."
      : "Your backlog is fresh. Keep capture tight and finish one priority before adding more tasks.";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Inbox cleanup</Text>
        <Text style={styles.title}>Move toward inbox zero</Text>
        <Text style={styles.description}>
          Use this screen to reduce backlog drag: clear old tasks first, then close short tasks for fast
          momentum.
        </Text>
      </View>

      <View style={styles.metricRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{String(summary.total).padStart(2, "0")}</Text>
          <Text style={styles.metricLabel}>Open tasks</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{String(summary.staleCount).padStart(2, "0")}</Text>
          <Text style={styles.metricLabel}>Stale (48h+)</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Cleanup order</Text>
        {isLoading ? (
          <Text style={styles.paragraph}>Ranking inbox tasks...</Text>
        ) : summary.cleanupList.length === 0 ? (
          <Text style={styles.paragraph}>No tasks in the inbox. You are already at inbox zero.</Text>
        ) : (
          summary.cleanupList.map((task, index) => (
            <View key={task.id} style={styles.stepRow}>
              <Text style={styles.stepLabel}>Step {index + 1}</Text>
              <Text style={styles.stepText}>{task.todo}</Text>
              <Text style={styles.stepMeta}>
                {ageHours(task.createdAt) === null ? "No timestamp" : `${ageHours(task.createdAt)}h queued`}
              </Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Execution note</Text>
        <Text style={styles.paragraph}>{message}</Text>
      </View>
    </ScrollView>
  );
}
