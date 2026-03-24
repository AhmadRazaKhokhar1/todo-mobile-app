import { useContext, useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../Contexts/ThemeContext";
import { useTodos } from "../hooks/useTodos";

const getAgeHours = (isoDate) => {
  const timestamp = Date.parse(isoDate);

  if (Number.isNaN(timestamp)) {
    return 0;
  }

  return Math.max(0, Math.floor((Date.now() - timestamp) / (1000 * 60 * 60)));
};

const getEffort = (text) => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  if (words <= 3) {
    return "Fast";
  }

  if (words <= 7) {
    return "Medium";
  }

  return "Deep";
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
    taskRow: {
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.border,
      backgroundColor: palette.surface,
      padding: 12,
      gap: 6,
    },
    taskHeading: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 1.1,
      fontWeight: "700",
      color: palette.textMuted,
    },
    taskText: {
      fontSize: 15,
      lineHeight: 21,
      color: palette.text,
      fontWeight: "700",
    },
    taskMeta: {
      fontSize: 13,
      color: palette.textMuted,
      fontWeight: "700",
    },
    statusText: {
      fontSize: 14,
      lineHeight: 21,
      color: palette.textMuted,
    },
  });

export default function Today() {
  const { palette } = useContext(ThemeContext);
  const { todos, isLoading } = useTodos();
  const styles = createStyles(palette);

  const plan = useMemo(() => {
    const ranked = [...todos]
      .map((task) => {
        const ageHours = getAgeHours(task.createdAt);
        const words = (task.todo || "").trim().split(/\s+/).filter(Boolean).length;

        return {
          ...task,
          ageHours,
          words,
          urgentScore: ageHours * 2 + Math.max(0, 8 - words),
          quickScore: Math.max(0, 10 - words) + Math.min(8, Math.floor(ageHours / 6)),
        };
      })
      .sort((a, b) => b.urgentScore - a.urgentScore);

    const urgent = ranked.slice(0, 1);
    const next = ranked.slice(1, 4);
    const quickWins = [...ranked].sort((a, b) => b.quickScore - a.quickScore).slice(0, 2);

    return {
      urgent,
      next,
      quickWins,
      total: ranked.length,
      olderThanDay: ranked.filter((task) => task.ageHours >= 24).length,
    };
  }, [todos]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Today cockpit</Text>
        <Text style={styles.title}>Run your day in order</Text>
        <Text style={styles.description}>
          Start with the most urgent task, follow the next queue, and use quick wins to keep momentum.
        </Text>
      </View>

      <View style={styles.metricRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{String(plan.total).padStart(2, "0")}</Text>
          <Text style={styles.metricLabel}>Open tasks</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{String(plan.olderThanDay).padStart(2, "0")}</Text>
          <Text style={styles.metricLabel}>Older than 24h</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Do first</Text>
        {isLoading ? (
          <Text style={styles.statusText}>Building your first-task recommendation...</Text>
        ) : plan.urgent.length === 0 ? (
          <Text style={styles.statusText}>No tasks yet. Capture your first task to build today's plan.</Text>
        ) : (
          plan.urgent.map((task) => (
            <View key={task.id} style={styles.taskRow}>
              <Text style={styles.taskHeading}>Highest urgency</Text>
              <Text style={styles.taskText}>{task.todo}</Text>
              <Text style={styles.taskMeta}>{task.ageHours}h in queue</Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Do next</Text>
        {isLoading ? (
          <Text style={styles.statusText}>Ranking next tasks...</Text>
        ) : plan.next.length === 0 ? (
          <Text style={styles.statusText}>Add at least two tasks to populate this queue.</Text>
        ) : (
          plan.next.map((task, index) => (
            <View key={task.id} style={styles.taskRow}>
              <Text style={styles.taskHeading}>Next {index + 1}</Text>
              <Text style={styles.taskText}>{task.todo}</Text>
              <Text style={styles.taskMeta}>Effort: {getEffort(task.todo || "")}</Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick wins</Text>
        {isLoading ? (
          <Text style={styles.statusText}>Finding shortest tasks...</Text>
        ) : plan.quickWins.length === 0 ? (
          <Text style={styles.statusText}>No quick wins yet.</Text>
        ) : (
          plan.quickWins.map((task, index) => (
            <View key={task.id} style={styles.taskRow}>
              <Text style={styles.taskHeading}>Win {index + 1}</Text>
              <Text style={styles.taskText}>{task.todo}</Text>
              <Text style={styles.taskMeta}>Effort: {getEffort(task.todo || "")}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
