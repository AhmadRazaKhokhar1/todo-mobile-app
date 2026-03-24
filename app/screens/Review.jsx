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
      minWidth: 130,
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
    taskText: {
      fontSize: 15,
      lineHeight: 21,
      color: palette.text,
      fontWeight: "700",
    },
    taskMeta: {
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: 1.1,
      color: palette.textMuted,
      fontWeight: "700",
    },
    paragraph: {
      fontSize: 14,
      lineHeight: 21,
      color: palette.textMuted,
    },
  });

export default function Review() {
  const { palette } = useContext(ThemeContext);
  const { todos, isLoading } = useTodos();
  const styles = createStyles(palette);

  const summary = useMemo(() => {
    let stale = 0;
    let fresh = 0;
    let undated = 0;

    const oldestFirst = [...todos].sort((a, b) => {
      const aTs = Date.parse(a.createdAt);
      const bTs = Date.parse(b.createdAt);

      if (Number.isNaN(aTs) && Number.isNaN(bTs)) {
        return 0;
      }

      if (Number.isNaN(aTs)) {
        return 1;
      }

      if (Number.isNaN(bTs)) {
        return -1;
      }

      return aTs - bTs;
    });

    oldestFirst.forEach((item) => {
      const ageHours = getAgeHours(item.createdAt);

      if (ageHours === null) {
        undated += 1;
        return;
      }

      if (ageHours >= 48) {
        stale += 1;
        return;
      }

      if (ageHours <= 24) {
        fresh += 1;
      }
    });

    return {
      stale,
      fresh,
      undated,
      oldest: oldestFirst.slice(0, 3),
    };
  }, [todos]);

  const nextMove =
    summary.stale > 0
      ? "Clear one stale task first to reduce backlog drag."
      : "Backlog is healthy. Keep momentum by finishing one priority task before adding new inputs.";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Daily review</Text>
        <Text style={styles.title}>Audit your backlog health</Text>
        <Text style={styles.description}>
          Use this review to quickly detect stale work and decide the best next move before planning your next
          session.
        </Text>
      </View>

      <View style={styles.metricRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{String(todos.length).padStart(2, "0")}</Text>
          <Text style={styles.metricLabel}>Total tasks</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{String(summary.stale).padStart(2, "0")}</Text>
          <Text style={styles.metricLabel}>Stale (48h+)</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{String(summary.fresh).padStart(2, "0")}</Text>
          <Text style={styles.metricLabel}>Fresh (24h)</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Oldest open tasks</Text>
        {isLoading ? (
          <Text style={styles.paragraph}>Loading tasks for review...</Text>
        ) : summary.oldest.length === 0 ? (
          <Text style={styles.paragraph}>No open tasks found.</Text>
        ) : (
          summary.oldest.map((item, index) => (
            <View key={item.id} style={styles.taskRow}>
              <Text style={styles.taskMeta}>Oldest {index + 1}</Text>
              <Text style={styles.taskText}>{item.todo}</Text>
              <Text style={styles.taskMeta}>
                {getAgeHours(item.createdAt) === null ? "No timestamp" : `${getAgeHours(item.createdAt)}h old`}
              </Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recommended action</Text>
        <Text style={styles.paragraph}>{nextMove}</Text>
        <Text style={styles.paragraph}>Undated tasks: {summary.undated}</Text>
      </View>
    </ScrollView>
  );
}
