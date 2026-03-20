import { useContext, useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../Contexts/ThemeContext";
import { useTodos } from "../hooks/useTodos";

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
    planGrid: {
      gap: 12,
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
    slotTask: {
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.border,
      backgroundColor: palette.surface,
      padding: 12,
      gap: 4,
    },
    slotLabel: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 1.1,
      color: palette.textMuted,
      fontWeight: "700",
    },
    taskText: {
      fontSize: 15,
      color: palette.text,
      fontWeight: "700",
      lineHeight: 21,
    },
    emptyText: {
      fontSize: 14,
      color: palette.textMuted,
      lineHeight: 21,
    },
  });

export default function Planner() {
  const { palette } = useContext(ThemeContext);
  const { todos, isLoading } = useTodos();
  const styles = createStyles(palette);

  const slots = useMemo(() => {
    const ordered = [...todos].sort((a, b) => {
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

    return [
      { label: "Morning focus block", task: ordered[0] },
      { label: "Midday execution block", task: ordered[1] },
      { label: "Evening wrap-up block", task: ordered[2] },
    ];
  }, [todos]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Execution planner</Text>
        <Text style={styles.title}>Convert tasks into a day plan</Text>
        <Text style={styles.description}>
          Assign your most important todos to time blocks so your day has a clear sequence and less
          decision fatigue.
        </Text>
      </View>

      <View style={styles.planGrid}>
        {slots.map((slot) => (
          <View key={slot.label} style={styles.card}>
            <Text style={styles.cardTitle}>{slot.label}</Text>
            {isLoading ? (
              <Text style={styles.cardText}>Syncing todos to build your plan...</Text>
            ) : slot.task ? (
              <View style={styles.slotTask}>
                <Text style={styles.slotLabel}>Assigned task</Text>
                <Text style={styles.taskText}>{slot.task.todo}</Text>
              </View>
            ) : (
              <Text style={styles.emptyText}>
                Add more todos in Home to auto-fill this planning block.
              </Text>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
