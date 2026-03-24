import { useContext, useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../Contexts/ThemeContext";
import { useTodos } from "../hooks/useTodos";

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
    lane: {
      borderRadius: 20,
      padding: 18,
      backgroundColor: palette.surfaceAlt,
      borderWidth: 1,
      borderColor: palette.border,
      gap: 10,
    },
    laneTitle: {
      fontSize: 18,
      fontWeight: "800",
      color: palette.text,
    },
    laneHint: {
      fontSize: 13,
      lineHeight: 20,
      color: palette.textMuted,
      marginTop: -2,
    },
    taskCard: {
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
      color: palette.textMuted,
      textTransform: "uppercase",
      letterSpacing: 1.1,
      fontWeight: "700",
    },
    emptyText: {
      fontSize: 14,
      lineHeight: 21,
      color: palette.textMuted,
    },
    loading: {
      borderRadius: 20,
      padding: 18,
      backgroundColor: palette.surfaceAlt,
      borderWidth: 1,
      borderColor: palette.border,
    },
    loadingText: {
      fontSize: 15,
      color: palette.text,
      fontWeight: "700",
    },
  });

export default function Agenda() {
  const { palette } = useContext(ThemeContext);
  const { todos, isLoading } = useTodos();
  const styles = createStyles(palette);

  const lanes = useMemo(() => {
    const seeded = {
      Now: [],
      Next: [],
      Later: [],
    };

    const sortedTodos = [...todos].sort((a, b) => {
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

    sortedTodos.forEach((task) => {
      const age = hoursSince(task.createdAt);

      if (age === null || age >= 24) {
        seeded.Now.push(task);
        return;
      }

      if (age >= 6) {
        seeded.Next.push(task);
        return;
      }

      seeded.Later.push(task);
    });

    return [
      {
        name: "Now",
        hint: "Older tasks that should be cleared first",
        items: seeded.Now.slice(0, 4),
      },
      {
        name: "Next",
        hint: "Tasks to execute after the current block",
        items: seeded.Next.slice(0, 4),
      },
      {
        name: "Later",
        hint: "Fresh tasks to queue once priorities are done",
        items: seeded.Later.slice(0, 4),
      },
    ];
  }, [todos]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Execution agenda</Text>
        <Text style={styles.title}>Plan with clear lanes</Text>
        <Text style={styles.description}>
          Route tasks into Now, Next, and Later lanes so your day has strict priority order without
          constant re-decisions.
        </Text>
      </View>

      {isLoading ? (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Building your agenda lanes from live todos...</Text>
        </View>
      ) : (
        lanes.map((lane) => (
          <View key={lane.name} style={styles.lane}>
            <Text style={styles.laneTitle}>{lane.name}</Text>
            <Text style={styles.laneHint}>{lane.hint}</Text>

            {lane.items.length === 0 ? (
              <Text style={styles.emptyText}>No tasks in this lane yet.</Text>
            ) : (
              lane.items.map((task) => (
                <View key={task.id} style={styles.taskCard}>
                  <Text style={styles.taskText}>{task.todo}</Text>
                  <Text style={styles.taskMeta}>
                    {hoursSince(task.createdAt) === null
                      ? "No created timestamp"
                      : `${hoursSince(task.createdAt)}h in queue`}
                  </Text>
                </View>
              ))
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}
