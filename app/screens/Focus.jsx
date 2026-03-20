import { useContext, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../Contexts/ThemeContext";
import { useTodos } from "../hooks/useTodos";

const FOCUS_WINDOW_SECONDS = 25 * 60;

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
    card: {
      borderRadius: 24,
      padding: 20,
      backgroundColor: palette.surfaceAlt,
      borderWidth: 1,
      borderColor: palette.border,
      gap: 12,
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
    text: {
      fontSize: 15,
      lineHeight: 22,
      color: palette.textMuted,
    },
    focusLabel: {
      fontSize: 13,
      fontWeight: "700",
      color: palette.textMuted,
      textTransform: "uppercase",
      letterSpacing: 1.3,
    },
    focusTask: {
      fontSize: 22,
      fontWeight: "800",
      color: palette.text,
      lineHeight: 30,
    },
    timer: {
      fontSize: 44,
      fontWeight: "900",
      color: palette.accentStrong,
    },
    row: {
      flexDirection: "row",
      gap: 10,
      flexWrap: "wrap",
      alignItems: "center",
    },
    button: {
      borderRadius: 14,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: palette.border,
      backgroundColor: palette.surface,
    },
    primaryButton: {
      backgroundColor: palette.accent,
      borderColor: palette.accent,
    },
    buttonText: {
      fontSize: 13,
      fontWeight: "800",
      color: palette.text,
    },
    primaryText: {
      color: "#ffffff",
    },
    queueItem: {
      borderRadius: 18,
      padding: 16,
      backgroundColor: palette.surface,
      borderWidth: 1,
      borderColor: palette.border,
      gap: 6,
    },
    queueMeta: {
      fontSize: 12,
      color: palette.textMuted,
      textTransform: "uppercase",
      letterSpacing: 1.2,
      fontWeight: "700",
    },
    queueText: {
      fontSize: 15,
      color: palette.text,
      fontWeight: "700",
    },
  });

function formatSeconds(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function Focus() {
  const { palette } = useContext(ThemeContext);
  const styles = createStyles(palette);
  const { todos, isLoading } = useTodos();
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(FOCUS_WINDOW_SECONDS);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const interval = setInterval(() => {
      setRemainingSeconds((currentValue) => {
        if (currentValue <= 1) {
          setIsRunning(false);
          return FOCUS_WINDOW_SECONDS;
        }

        return currentValue - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    setFocusedIndex((currentValue) => {
      if (todos.length === 0) {
        return 0;
      }

      return Math.min(currentValue, todos.length - 1);
    });
  }, [todos]);

  const activeTodo = todos[focusedIndex];
  const nextQueue = useMemo(() => todos.slice(focusedIndex + 1, focusedIndex + 4), [todos, focusedIndex]);

  const handleNext = () => {
    if (todos.length === 0) {
      return;
    }

    setFocusedIndex((currentValue) => (currentValue + 1) % todos.length);
  };

  const handlePrevious = () => {
    if (todos.length === 0) {
      return;
    }

    setFocusedIndex((currentValue) => (currentValue - 1 + todos.length) % todos.length);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Focus mode</Text>
        <Text style={styles.title}>Single-task execution</Text>
        <Text style={styles.text}>
          Lock on one task at a time with a 25-minute sprint timer to reduce context switching and finish
          faster.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.focusLabel}>Current focus</Text>
        <Text style={styles.focusTask}>
          {isLoading
            ? "Loading your task queue..."
            : activeTodo
              ? activeTodo.todo
              : "No tasks available yet. Add one from Home to begin a sprint."}
        </Text>
        <Text style={styles.timer}>{formatSeconds(remainingSeconds)}</Text>

        <View style={styles.row}>
          <Pressable
            onPress={() => setIsRunning((value) => !value)}
            style={[styles.button, styles.primaryButton]}
            disabled={todos.length === 0}
          >
            <Text style={[styles.buttonText, styles.primaryText]}>{isRunning ? "Pause Sprint" : "Start Sprint"}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setIsRunning(false);
              setRemainingSeconds(FOCUS_WINDOW_SECONDS);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </Pressable>
          <Pressable onPress={handlePrevious} style={styles.button} disabled={todos.length === 0}>
            <Text style={styles.buttonText}>Previous</Text>
          </Pressable>
          <Pressable onPress={handleNext} style={styles.button} disabled={todos.length === 0}>
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
      </View>

      {nextQueue.map((todoItem, index) => (
        <View style={styles.queueItem} key={todoItem.id}>
          <Text style={styles.queueMeta}>Up next {index + 1}</Text>
          <Text style={styles.queueText}>{todoItem.todo}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
