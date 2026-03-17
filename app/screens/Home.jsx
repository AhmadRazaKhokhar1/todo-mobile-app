import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { ThemeContext } from "../Contexts/ThemeContext";
import { db } from "../../firebase.config";

export default function Home() {
  const { currentMode } = useContext(ThemeContext);
  const isLight = currentMode === "false";
  const [isDeleting, setIsDeleting] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = async () => {
    if (!todo.trim()) {
      return alert("The field should not be empty! please try again");
    }

    const collectionRef = db.collection("todos");
    await collectionRef.add({ todo: todo.trim() });
    setTodo("");
    Keyboard.dismiss();
    fetchTodos();
  };

  async function fetchTodos() {
    try {
      setIsLoading(true);
      const collectionRef = db.collection("todos");
      const data = await collectionRef.get();
      setTodos(data.docs);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert("error while fetching the data!");
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      setIsDeleting(id);
      const collectionRef = db.collection("todos");
      const docRef = collectionRef.doc(id);
      await docRef.delete();
      setIsDeleting(null);
      fetchTodos();
    } catch (error) {
      setIsDeleting(null);
      alert("There was an internal server error while deleting todo!");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isLight ? "#F5F8FF" : "#060912" }]}>
      <Text style={[styles.heading, { color: isLight ? "#0B1733" : "#ECF2FF" }]}>Mission Board</Text>
      <Text style={[styles.subHeading, { color: isLight ? "#3E4E77" : "#95A6CE" }]}>Plan your next move.</Text>

      <View
        style={[
          styles.formCard,
          {
            backgroundColor: isLight ? "#FFFFFF" : "#0E1528",
            borderColor: isLight ? "#DCE7FF" : "#1C2A4A",
          },
        ]}
      >
        <TextInput
          value={todo}
          onChangeText={setTodo}
          style={[styles.field, { color: isLight ? "#08122B" : "#DDE7FF" }]}
          placeholder="Add a future task..."
          placeholderTextColor={isLight ? "#8A9AC2" : "#6677A1"}
          inputMode="text"
        />
        <Pressable style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonLabel}>Add</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.todos} showsVerticalScrollIndicator={false}>
        {!isLoading ? (
          todos?.map((todoItem) => (
            <View
              key={todoItem.id}
              style={[
                styles.todoCard,
                {
                  backgroundColor: isLight ? "#EAF1FF" : "#0E1A35",
                  borderColor: isLight ? "#CDDDFF" : "#213969",
                },
              ]}
            >
              <Text style={[styles.todoText, { color: isLight ? "#0E1B3A" : "#DCE6FF" }]}>
                {isDeleting === todoItem.id ? "Deleting..." : todoItem.data()?.todo}
              </Text>
              <Pressable style={styles.deleteButton} onPress={() => deleteTodo(todoItem.id)}>
                <Text style={styles.deleteText}>{isDeleting === todoItem.id ? "Deleting..." : "Delete"}</Text>
              </Pressable>
            </View>
          ))
        ) : (
          <View style={styles.loaderBox}>
            <ActivityIndicator size="large" color="#5B7CFF" />
            <Text style={{ color: isLight ? "#253C74" : "#A8BAE8", marginTop: 8 }}>Syncing tasks...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  heading: {
    fontWeight: "900",
    fontSize: 30,
  },
  subHeading: {
    marginTop: 4,
    marginBottom: 18,
  },
  formCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 18,
    padding: 10,
    marginBottom: 20,
  },
  field: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  button: {
    backgroundColor: "#4D72FF",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginLeft: 10,
  },
  buttonLabel: {
    color: "#fff",
    fontWeight: "800",
  },
  todos: {
    paddingBottom: 40,
    gap: 12,
  },
  todoCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
  },
  todoText: {
    maxWidth: "72%",
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#F04F77",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
  loaderBox: {
    marginTop: 40,
    alignItems: "center",
  },
});
