import { useContext, useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../Contexts/ThemeContext";
import { useTodos } from "../hooks/useTodos";

const categoryRules = [
  { name: "Planning", keywords: ["plan", "review", "prepare", "organize", "schedule"] },
  { name: "Execution", keywords: ["build", "write", "code", "ship", "deploy", "finish"] },
  { name: "Communication", keywords: ["call", "email", "follow up", "meeting", "message"] },
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
    itemRow: {
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.border,
      backgroundColor: palette.surface,
      padding: 12,
      gap: 6,
    },
    itemLabel: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 1.1,
      color: palette.textMuted,
      fontWeight: "700",
    },
    itemText: {
      fontSize: 15,
      lineHeight: 21,
      color: palette.text,
      fontWeight: "700",
    },
    paragraph: {
      fontSize: 14,
      lineHeight: 21,
      color: palette.textMuted,
    },
  });

export default function Routines() {
  const { palette } = useContext(ThemeContext);
  const { todos, isLoading } = useTodos();
  const styles = createStyles(palette);

  const summary = useMemo(() => {
    const bucketCounts = categoryRules.reduce((accumulator, rule) => {
      accumulator[rule.name] = 0;
      return accumulator;
    }, {});

    let uncategorized = 0;

    todos.forEach((task) => {
      const text = (task.todo || "").toLowerCase();
      const matched = categoryRules.find((rule) =>
        rule.keywords.some((keyword) => text.includes(keyword))
      );

      if (matched) {
        bucketCounts[matched.name] += 1;
        return;
      }

      uncategorized += 1;
    });

    const routineRows = [
      { label: "Morning setup", cue: "Pick one Planning task and complete it before noon." },
      { label: "Core execution", cue: "Finish two Execution tasks in focused sprints." },
      { label: "Daily close", cue: "Clear one Communication task before ending the day." },
    ];

    return {
      total: todos.length,
      bucketCounts,
      uncategorized,
      routineRows,
    };
  }, [todos]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Routine builder</Text>
        <Text style={styles.title}>Turn todos into daily rhythm</Text>
        <Text style={styles.description}>
          Map your open tasks into repeatable daily routines so planning and execution happen with less
          friction.
        </Text>
      </View>

      <View style={styles.metricRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{String(summary.total).padStart(2, "0")}</Text>
          <Text style={styles.metricLabel}>Open tasks</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{String(summary.uncategorized).padStart(2, "0")}</Text>
          <Text style={styles.metricLabel}>General tasks</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Routine coverage</Text>
        {Object.entries(summary.bucketCounts).map(([name, count]) => (
          <View key={name} style={styles.itemRow}>
            <Text style={styles.itemLabel}>{name}</Text>
            <Text style={styles.itemText}>{count} tasks mapped</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Suggested routine</Text>
        {isLoading ? (
          <Text style={styles.paragraph}>Generating your routine from live tasks...</Text>
        ) : (
          summary.routineRows.map((row) => (
            <View key={row.label} style={styles.itemRow}>
              <Text style={styles.itemLabel}>{row.label}</Text>
              <Text style={styles.itemText}>{row.cue}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
