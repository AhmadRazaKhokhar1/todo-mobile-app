import { useContext, useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../Contexts/ThemeContext";
import { useTodos } from "../hooks/useTodos";

const formatAge = (isoDate) => {
  const timestamp = Date.parse(isoDate);

  if (Number.isNaN(timestamp)) {
    return "Age unknown";
  }

  const elapsedHours = Math.max(0, Math.floor((Date.now() - timestamp) / (1000 * 60 * 60)));

  if (elapsedHours < 1) {
    return "Created under 1h ago";
  }

  if (elapsedHours < 24) {
    return `Created ${elapsedHours}h ago`;
  }

  const days = Math.floor(elapsedHours / 24);
  return `Created ${days}d ago`;
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
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.border,
      backgroundColor: palette.surface,
      padding: 14,
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
    quickActions: {
      gap: 10,
    },
    actionRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    actionChip: {
      borderRadius: 999,
      borderWidth: 1,
      borderColor: palette.border,
      backgroundColor: palette.surface,
      paddingHorizontal: 14,
      paddingVertical: 10,
    },
    actionText: {
      fontSize: 13,
      fontWeight: "800",
      color: palette.text,
    },
  });

export default function Priorities() {
  const { palette } = useContext(ThemeContext);
  const { todos, isLoading } = useTodos();
  const styles = createStyles(palette);

  const topTasks = useMemo(() => {
    return [...todos]
      .sort((a, b) => {
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
      })
      .slice(0, 3);
  }, [todos]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Priority lane</Text>
        <Text style={styles.title}>Pick what moves the day</Text>
        <Text style={styles.description}>
          Keep your top three tasks visible so planning stays intentional and execution stays focused.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Top priorities</Text>

        {isLoading ? (
          <Text style={styles.statusText}>Syncing tasks before generating your priority lane.</Text>
        ) : topTasks.length === 0 ? (
          <Text style={styles.statusText}>
            Add tasks on Home and this screen will surface the first three as your execution queue.
          </Text>
        ) : (
          topTasks.map((task, index) => (
            <View key={task.id} style={styles.taskRow}>
              <Text style={styles.taskHeading}>Priority {index + 1}</Text>
              <Text style={styles.taskText}>{task.todo}</Text>
              <Text style={styles.taskMeta}>{formatAge(task.createdAt)}</Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Execution checklist</Text>
        <View style={styles.quickActions}>
          <View style={styles.actionRow}>
            <Pressable style={styles.actionChip}>
              <Text style={styles.actionText}>1. Choose one task</Text>
            </Pressable>
            <Pressable style={styles.actionChip}>
              <Text style={styles.actionText}>2. Run Focus timer</Text>
            </Pressable>
          </View>
          <View style={styles.actionRow}>
            <Pressable style={styles.actionChip}>
              <Text style={styles.actionText}>3. Avoid new inputs</Text>
            </Pressable>
            <Pressable style={styles.actionChip}>
              <Text style={styles.actionText}>4. Delete when done</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
