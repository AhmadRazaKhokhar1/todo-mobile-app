import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from "react-native";

const createStyles = (palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.surface,
    },
    content: {
      padding: 18,
      paddingBottom: 28,
      gap: 18,
    },
    heroCard: {
      borderRadius: 24,
      padding: 20,
      backgroundColor: palette.surfaceAlt,
      borderWidth: 1,
      borderColor: palette.border,
      gap: 12,
    },
    heroEyebrow: {
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      fontWeight: "700",
      color: palette.textMuted,
    },
    heroTitle: {
      fontSize: 30,
      fontWeight: "900",
      color: palette.text,
    },
    heroText: {
      fontSize: 15,
      lineHeight: 22,
      color: palette.textMuted,
      maxWidth: 620,
    },
    metricsRow: {
      flexDirection: "row",
      gap: 12,
      flexWrap: "wrap",
    },
    metricCard: {
      minWidth: 140,
      flexGrow: 1,
      borderRadius: 18,
      padding: 16,
      backgroundColor: palette.surface,
      borderWidth: 1,
      borderColor: palette.border,
    },
    metricValue: {
      fontSize: 24,
      fontWeight: "900",
      color: palette.text,
      marginBottom: 4,
    },
    metricLabel: {
      fontSize: 13,
      color: palette.textMuted,
      fontWeight: "700",
    },
    composer: {
      borderRadius: 24,
      padding: 18,
      backgroundColor: palette.surfaceAlt,
      borderWidth: 1,
      borderColor: palette.border,
      gap: 14,
    },
    composerTitle: {
      fontSize: 18,
      fontWeight: "800",
      color: palette.text,
    },
    composerRow: {
      gap: 12,
    },
    composerRowWide: {
      flexDirection: "row",
      alignItems: "center",
    },
    composerActions: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    composerActionsCompact: {
      width: "100%",
    },
    field: {
      flex: 1,
      minWidth: 220,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 14,
      backgroundColor: palette.surface,
      borderWidth: 1,
      borderColor: palette.border,
      color: palette.text,
    },
    fieldCompact: {
      minWidth: 0,
      width: "100%",
    },
    button: {
      minWidth: 135,
      borderRadius: 16,
      paddingHorizontal: 20,
      paddingVertical: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: palette.accent,
    },
    buttonWide: {
      alignSelf: "center",
    },
    buttonCompact: {
      width: "100%",
      minWidth: 0,
      alignSelf: "stretch",
    },
    buttonText: {
      color: "#ffffff",
      fontSize: 14,
      fontWeight: "800",
    },
    sectionHeader: {
      gap: 4,
    },
    sectionEyebrow: {
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      fontWeight: "700",
      color: palette.textMuted,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "800",
      color: palette.text,
    },
    list: {
      gap: 12,
      paddingBottom: 6,
    },
    todoCard: {
      borderRadius: 22,
      padding: 18,
      backgroundColor: palette.surfaceAlt,
      borderWidth: 1,
      borderColor: palette.border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    todoCopy: {
      flex: 1,
      gap: 4,
    },
    todoLabel: {
      fontSize: 16,
      fontWeight: "700",
      color: palette.text,
    },
    todoMeta: {
      fontSize: 12,
      fontWeight: "700",
      color: palette.textMuted,
      textTransform: "uppercase",
      letterSpacing: 1.2,
    },
    deleteButton: {
      borderRadius: 14,
      paddingHorizontal: 14,
      paddingVertical: 10,
      backgroundColor: palette.danger,
      alignItems: "center",
      justifyContent: "center",
    },
    deleteText: {
      color: "#ffffff",
      fontWeight: "800",
      fontSize: 13,
    },
    statusCard: {
      borderRadius: 22,
      padding: 20,
      backgroundColor: palette.surfaceAlt,
      borderWidth: 1,
      borderColor: palette.border,
      alignItems: "center",
      gap: 8,
    },
    statusTitle: {
      fontSize: 18,
      fontWeight: "800",
      color: palette.text,
    },
    statusText: {
      fontSize: 14,
      lineHeight: 21,
      color: palette.textMuted,
      textAlign: "center",
      maxWidth: 520,
    },
  });

export default function TodoDashboard({
  palette,
  todo,
  setTodo,
  todos,
  isLoading,
  isSubmitting,
  deletingId,
  metrics,
  onAddTodo,
  onDeleteTodo,
}) {
  const styles = createStyles(palette);
  const { width } = useWindowDimensions();
  const isCompactLayout = width < 640;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.heroEyebrow}>Mission board</Text>
        <Text style={styles.heroTitle}>Plan fast. Ship faster.</Text>
        <Text style={styles.heroText}>
          Your todo system now behaves like a compact futuristic command center with live sync, rapid
          capture, and a cleaner dashboard for everyday execution.
        </Text>

        <View style={styles.metricsRow}>
          {metrics.map((metric) => (
            <View key={metric.label} style={styles.metricCard}>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricLabel}>{metric.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.composer}>
        <Text style={styles.composerTitle}>Create a new task pulse</Text>
        <View style={[styles.composerRow, !isCompactLayout && styles.composerRowWide]}>
          <TextInput
            value={todo}
            onChangeText={setTodo}
            style={[styles.field, isCompactLayout && styles.fieldCompact]}
            inputMode="text"
            placeholder="Enter your next task"
            placeholderTextColor={palette.textMuted}
          />
          <View style={[styles.composerActions, isCompactLayout && styles.composerActionsCompact]}>
            <Pressable
              style={[styles.button, !isCompactLayout && styles.buttonWide, isCompactLayout && styles.buttonCompact]}
              onPress={onAddTodo}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>{isSubmitting ? "Launching..." : "Add Task"}</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionEyebrow}>Live feed</Text>
        <Text style={styles.sectionTitle}>Current operations</Text>
      </View>

      <View style={styles.list}>
        {isLoading ? (
          <View style={styles.statusCard}>
            <Text style={styles.statusTitle}>Syncing task stream</Text>
            <Text style={styles.statusText}>Fetching the latest todos from your realtime workspace.</Text>
          </View>
        ) : todos.length === 0 ? (
          <View style={styles.statusCard}>
            <Text style={styles.statusTitle}>No missions queued</Text>
            <Text style={styles.statusText}>
              Add your first todo to populate the board and start tracking progress in this upgraded UI.
            </Text>
          </View>
        ) : (
          todos.map((todoItem, index) => (
            <View key={todoItem.id} style={styles.todoCard}>
              <View style={styles.todoCopy}>
                <Text style={styles.todoMeta}>Task {String(index + 1).padStart(2, "0")}</Text>
                <Text style={styles.todoLabel}>{deletingId === todoItem.id ? "Removing task..." : todoItem.todo}</Text>
              </View>
              <Pressable
                style={styles.deleteButton}
                onPress={() => onDeleteTodo(todoItem.id)}
                disabled={deletingId === todoItem.id}
              >
                <Text style={styles.deleteText}>{deletingId === todoItem.id ? "Removing" : "Delete"}</Text>
              </Pressable>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
