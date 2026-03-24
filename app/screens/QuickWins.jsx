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

const getEffortLabel = (taskText) => {
  const words = taskText.trim().split(/\s+/).filter(Boolean).length;

  if (words <= 3) {
    return "Fast";
  }

  if (words <= 7) {
    return "Medium";
  }

  return "Longer";
};

const getQuickWinScore = (task) => {
  const todoText = task.todo || "";
  const words = todoText.trim().split(/\s+/).filter(Boolean).length;
  const ageHours = getAgeHours(task.createdAt) ?? 0;
  const shortnessBonus = Math.max(0, 10 - words);
  const ageBonus = Math.min(12, Math.floor(ageHours / 6));

  return shortnessBonus + ageBonus;
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
      letterSpacing: 1.2,
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

export default function QuickWins() {
  const { palette } = useContext(ThemeContext);
  const { todos, isLoading } = useTodos();
  const styles = createStyles(palette);

  const quickWins = useMemo(() => {
    return [...todos]
      .sort((a, b) => getQuickWinScore(b) - getQuickWinScore(a))
      .slice(0, 5);
  }, [todos]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Quick wins</Text>
        <Text style={styles.title}>Ship progress in short bursts</Text>
        <Text style={styles.description}>
          These tasks are likely fast to close. Finishing one or two first can build momentum before deep
          work blocks.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Best tasks to clear now</Text>

        {isLoading ? (
          <Text style={styles.statusText}>Analyzing tasks to find quick wins...</Text>
        ) : quickWins.length === 0 ? (
          <Text style={styles.statusText}>No tasks available yet. Add tasks on Home to generate suggestions.</Text>
        ) : (
          quickWins.map((task, index) => (
            <View key={task.id} style={styles.taskRow}>
              <Text style={styles.taskHeading}>Quick win {index + 1}</Text>
              <Text style={styles.taskText}>{task.todo}</Text>
              <Text style={styles.taskMeta}>
                Effort: {getEffortLabel(task.todo || "")}
                {" | "}
                {getAgeHours(task.createdAt) === null ? "No timestamp" : `${getAgeHours(task.createdAt)}h old`}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
