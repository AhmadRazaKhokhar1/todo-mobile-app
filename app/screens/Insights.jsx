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
      fontSize: 15,
      lineHeight: 23,
      color: palette.textMuted,
    },
    metricsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    metricCard: {
      minWidth: 145,
      flexGrow: 1,
      borderRadius: 18,
      padding: 16,
      backgroundColor: palette.surfaceAlt,
      borderWidth: 1,
      borderColor: palette.border,
      gap: 6,
    },
    metricLabel: {
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: 1.2,
      fontWeight: "700",
      color: palette.textMuted,
    },
    metricValue: {
      fontSize: 26,
      fontWeight: "900",
      color: palette.text,
    },
    listCard: {
      borderRadius: 24,
      padding: 18,
      backgroundColor: palette.surfaceAlt,
      borderWidth: 1,
      borderColor: palette.border,
      gap: 12,
    },
    listTitle: {
      fontSize: 18,
      fontWeight: "800",
      color: palette.text,
    },
    row: {
      borderRadius: 14,
      padding: 14,
      backgroundColor: palette.surface,
      borderWidth: 1,
      borderColor: palette.border,
      gap: 4,
    },
    rowLabel: {
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: 1.2,
      color: palette.textMuted,
      fontWeight: "700",
    },
    rowValue: {
      fontSize: 15,
      color: palette.text,
      fontWeight: "700",
    },
  });

export default function Insights() {
  const { palette } = useContext(ThemeContext);
  const styles = createStyles(palette);
  const { todos, isLoading } = useTodos();

  const insights = useMemo(() => {
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;
    const recentCount = todos.reduce((acc, todoItem) => {
      const createdTime = Date.parse(todoItem.createdAt ?? "");
      return Number.isNaN(createdTime) || now - createdTime > oneDayMs ? acc : acc + 1;
    }, 0);

    const totalLength = todos.reduce((acc, todoItem) => acc + (todoItem.todo?.length ?? 0), 0);
    const averageLength = todos.length === 0 ? 0 : Math.round(totalLength / todos.length);
    const longestLabel = todos.reduce(
      (longest, todoItem) => {
        const currentValue = todoItem.todo ?? "";
        return currentValue.length > longest.length
          ? { value: currentValue, length: currentValue.length }
          : longest;
      },
      { value: "No tasks yet", length: 0 }
    );

    const latestTasks = [...todos]
      .sort((left, right) => {
        const leftTime = Date.parse(left.createdAt ?? "");
        const rightTime = Date.parse(right.createdAt ?? "");
        return (Number.isNaN(rightTime) ? 0 : rightTime) - (Number.isNaN(leftTime) ? 0 : leftTime);
      })
      .slice(0, 4);

    return {
      totalTasks: todos.length,
      recentCount,
      averageLength,
      longestTask: longestLabel.value,
      latestTasks,
    };
  }, [todos]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Productivity analytics</Text>
        <Text style={styles.title}>Insights from your live queue</Text>
        <Text style={styles.description}>
          Use these live metrics to keep task size balanced and prevent list overload before it starts
          slowing down daily execution.
        </Text>
      </View>

      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Total tasks</Text>
          <Text style={styles.metricValue}>{isLoading ? "--" : insights.totalTasks}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Added in 24h</Text>
          <Text style={styles.metricValue}>{isLoading ? "--" : insights.recentCount}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Avg title length</Text>
          <Text style={styles.metricValue}>{isLoading ? "--" : insights.averageLength}</Text>
        </View>
      </View>

      <View style={styles.listCard}>
        <Text style={styles.listTitle}>Quality signal</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Longest task title</Text>
          <Text style={styles.rowValue}>{isLoading ? "Loading..." : insights.longestTask}</Text>
        </View>
      </View>

      <View style={styles.listCard}>
        <Text style={styles.listTitle}>Newest tasks</Text>
        {isLoading ? (
          <View style={styles.row}>
            <Text style={styles.rowValue}>Syncing tasks...</Text>
          </View>
        ) : insights.latestTasks.length === 0 ? (
          <View style={styles.row}>
            <Text style={styles.rowValue}>No tasks added yet.</Text>
          </View>
        ) : (
          insights.latestTasks.map((todoItem, index) => (
            <View style={styles.row} key={todoItem.id}>
              <Text style={styles.rowLabel}>#{index + 1}</Text>
              <Text style={styles.rowValue}>{todoItem.todo}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
