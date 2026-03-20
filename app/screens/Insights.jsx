import { useContext, useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../Contexts/ThemeContext";
import { useTodos } from "../hooks/useTodos";

const keywordBuckets = {
  Work: ["meeting", "deploy", "release", "review", "client", "code", "ticket"],
  Personal: ["family", "health", "exercise", "read", "learn", "plan", "home"],
  Errands: ["buy", "shop", "bill", "bank", "clean", "call", "email"],
};

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
      fontSize: 23,
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
    bucketRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 8,
      paddingVertical: 4,
    },
    bucketLabel: {
      fontSize: 14,
      color: palette.text,
      fontWeight: "700",
    },
    bucketValue: {
      fontSize: 14,
      color: palette.textMuted,
      fontWeight: "800",
    },
    paragraph: {
      fontSize: 14,
      lineHeight: 21,
      color: palette.textMuted,
    },
    loadingTitle: {
      fontSize: 18,
      fontWeight: "800",
      color: palette.text,
    },
  });

export default function Insights() {
  const { palette } = useContext(ThemeContext);
  const { todos, isLoading } = useTodos();
  const styles = createStyles(palette);

  const summary = useMemo(() => {
    const bucketCounts = Object.keys(keywordBuckets).reduce((accumulator, name) => {
      accumulator[name] = 0;
      return accumulator;
    }, {});

    let untagged = 0;
    let recentCount = 0;
    let oldestHours = null;

    todos.forEach((todoItem) => {
      const todoText = (todoItem.todo || "").toLowerCase();
      const matched = Object.entries(keywordBuckets).find(([, keywords]) =>
        keywords.some((keyword) => todoText.includes(keyword))
      );

      if (matched) {
        bucketCounts[matched[0]] += 1;
      } else {
        untagged += 1;
      }

      const createdHours = hoursSince(todoItem.createdAt);

      if (createdHours !== null) {
        if (createdHours <= 24) {
          recentCount += 1;
        }

        oldestHours = oldestHours === null ? createdHours : Math.max(oldestHours, createdHours);
      }
    });

    const focusPressure = todos.length >= 8 ? "High" : todos.length >= 4 ? "Medium" : "Low";
    const staleTaskMessage =
      oldestHours === null
        ? "No dated tasks yet."
        : oldestHours >= 48
          ? "You have tasks waiting for over 2 days."
          : "Task age is under control.";

    return {
      total: todos.length,
      recentCount,
      focusPressure,
      bucketCounts,
      untagged,
      staleTaskMessage,
    };
  }, [todos]);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.content]}>
        <Text style={styles.loadingTitle}>Preparing productivity insights...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Insights board</Text>
        <Text style={styles.title}>Understand your workload</Text>
        <Text style={styles.description}>
          Turn your raw todo list into a quick decision layer so you know what to execute first.
        </Text>
      </View>

      <View style={styles.metricRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{String(summary.total).padStart(2, "0")}</Text>
          <Text style={styles.metricLabel}>Total Tasks</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{String(summary.recentCount).padStart(2, "0")}</Text>
          <Text style={styles.metricLabel}>Added in 24h</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{summary.focusPressure}</Text>
          <Text style={styles.metricLabel}>Focus Pressure</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Task categories</Text>

        {Object.entries(summary.bucketCounts).map(([name, count]) => (
          <View key={name} style={styles.bucketRow}>
            <Text style={styles.bucketLabel}>{name}</Text>
            <Text style={styles.bucketValue}>{count}</Text>
          </View>
        ))}

        <View style={styles.bucketRow}>
          <Text style={styles.bucketLabel}>General</Text>
          <Text style={styles.bucketValue}>{summary.untagged}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recommended next move</Text>
        <Text style={styles.paragraph}>{summary.staleTaskMessage}</Text>
        <Text style={styles.paragraph}>
          Pick one high-impact task, run a focus sprint, and avoid adding new items until it is finished.
        </Text>
      </View>
    </ScrollView>
  );
}
