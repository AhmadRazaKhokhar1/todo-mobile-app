import { useContext, useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { ThemeContext } from "../Contexts/ThemeContext";
import { useTodos } from "../hooks/useTodos";

const quickTemplates = [
  "Follow up on",
  "Draft plan for",
  "Prepare notes for",
  "Review and close",
  "Call and confirm",
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
    card: {
      borderRadius: 20,
      padding: 18,
      backgroundColor: palette.surfaceAlt,
      borderWidth: 1,
      borderColor: palette.border,
      gap: 12,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "800",
      color: palette.text,
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      alignItems: "center",
    },
    field: {
      flex: 1,
      minWidth: 220,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.border,
      backgroundColor: palette.surface,
      color: palette.text,
      paddingHorizontal: 16,
      paddingVertical: 13,
    },
    addButton: {
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 13,
      backgroundColor: palette.accent,
      minWidth: 110,
      alignItems: "center",
      justifyContent: "center",
    },
    addText: {
      color: "#ffffff",
      fontSize: 13,
      fontWeight: "800",
    },
    templateChip: {
      borderRadius: 999,
      borderWidth: 1,
      borderColor: palette.border,
      backgroundColor: palette.surface,
      paddingHorizontal: 13,
      paddingVertical: 9,
    },
    templateText: {
      fontSize: 13,
      fontWeight: "700",
      color: palette.text,
    },
    emptyText: {
      fontSize: 14,
      lineHeight: 21,
      color: palette.textMuted,
    },
    taskRow: {
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.border,
      backgroundColor: palette.surface,
      padding: 12,
      gap: 6,
    },
    taskLabel: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 1.1,
      color: palette.textMuted,
      fontWeight: "700",
    },
    taskText: {
      fontSize: 15,
      lineHeight: 21,
      color: palette.text,
      fontWeight: "700",
    },
  });

export default function Capture() {
  const { palette } = useContext(ThemeContext);
  const { todo, setTodo, todos, isSubmitting, isLoading, addTodo } = useTodos();
  const styles = createStyles(palette);

  const latestTodos = useMemo(() => {
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

        return bTs - aTs;
      })
      .slice(0, 5);
  }, [todos]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Capture lane</Text>
        <Text style={styles.title}>Inbox your tasks in seconds</Text>
        <Text style={styles.description}>
          Use templates for repeated task patterns, then quickly submit without leaving the productivity flow.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick add</Text>

        <View style={styles.row}>
          <TextInput
            value={todo}
            onChangeText={setTodo}
            style={styles.field}
            inputMode="text"
            placeholder="Type a task to capture"
            placeholderTextColor={palette.textMuted}
          />
          <Pressable style={styles.addButton} onPress={addTodo} disabled={isSubmitting}>
            <Text style={styles.addText}>{isSubmitting ? "Saving..." : "Add"}</Text>
          </Pressable>
        </View>

        <View style={styles.row}>
          {quickTemplates.map((template) => (
            <Pressable
              key={template}
              style={styles.templateChip}
              onPress={() => {
                setTodo((current) => (current ? `${current} ${template}` : template));
              }}
            >
              <Text style={styles.templateText}>{template}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Latest captured tasks</Text>

        {isLoading ? (
          <Text style={styles.emptyText}>Loading your newest tasks...</Text>
        ) : latestTodos.length === 0 ? (
          <Text style={styles.emptyText}>No tasks in the inbox yet. Capture your first task above.</Text>
        ) : (
          latestTodos.map((todoItem, index) => (
            <View key={todoItem.id} style={styles.taskRow}>
              <Text style={styles.taskLabel}>Recent {index + 1}</Text>
              <Text style={styles.taskText}>{todoItem.todo}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
