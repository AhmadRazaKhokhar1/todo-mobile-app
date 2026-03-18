import { useContext } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { ThemeContext } from "../Contexts/ThemeContext";
import { useTodos } from "../hooks/useTodos";

const createStyles = (currentMode) =>
  StyleSheet.create({
    todos: {
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 55,
      width: "100%",
      paddingBottom: 24,
    },
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    heading: {
      fontWeight: "900",
      fontSize: 25,
    },
    form: {
      marginTop: 32,
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 3,
      alignItems: "center",
      position: "absolute",
      zIndex: 99,
    },
    field: {
      backgroundColor: "lightgray",
      borderRadius: 12,
      padding: 8,
      width: 250,
      margin: 5,
    },
    button: {
      backgroundColor: currentMode === "false" ? "dodgerblue" : "black",
      borderRadius: 15,
      padding: 12,
      minWidth: 60,
      alignItems: "center",
    },
    todoCard: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: currentMode === "false" ? "dodgerblue" : "black",
      padding: 10,
      borderRadius: 13,
      alignItems: "center",
      maxWidth: "80%",
      minWidth: "80%",
      marginTop: 12,
    },
    todoText: {
      color: "white",
      padding: 5,
      flex: 1,
    },
    deleteButton: {
      backgroundColor: "red",
      padding: 5,
      borderRadius: 8,
    },
    statusText: {
      color: "black",
      fontWeight: "800",
      marginTop: 80,
    },
  });

export default function Home() {
  const { currentMode } = useContext(ThemeContext);
  const { todo, setTodo, todos, isLoading, isSubmitting, deletingId, addTodo, deleteTodo } = useTodos();
  const styles = createStyles(currentMode);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo App</Text>
      <View style={styles.form}>
        <TextInput
          value={todo}
          onChangeText={setTodo}
          style={styles.field}
          inputMode="text"
          placeholder="Add a todo"
        />
        <Pressable style={styles.button} onPress={addTodo} disabled={isSubmitting}>
          <Text style={{ color: "white" }}>{isSubmitting ? "..." : "Add"}</Text>
        </Pressable>
      </View>
      <ScrollView
        contentContainerStyle={styles.todos}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <Text style={styles.statusText}>Loading...</Text>
        ) : (
          todos.map((todoItem) => (
            <View key={todoItem.id} style={styles.todoCard}>
              <Text style={styles.todoText}>
                {deletingId === todoItem.id ? "Deleting..." : todoItem.todo}
              </Text>
              <Pressable
                style={styles.deleteButton}
                onPress={() => deleteTodo(todoItem.id)}
                disabled={deletingId === todoItem.id}
              >
                <Text style={{ color: "white" }}>
                  {deletingId === todoItem.id ? "Deleting..." : "Delete"}
                </Text>
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
