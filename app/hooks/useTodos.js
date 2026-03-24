import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Keyboard } from "react-native";
import { createTodo, removeTodo, subscribeToTodos } from "../services/todoService";

export function useTodos() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToTodos(
      (nextTodos) => {
        setTodos(nextTodos);
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
        Alert.alert("Unable to load todos", "Error while fetching todos. Please try again.");
      }
    );

    return unsubscribe;
  }, []);

  const addTodo = useCallback(async () => {
    const trimmedTodo = todo.trim();

    if (!trimmedTodo) {
      Alert.alert("Todo required", "The field should not be empty. Please try again.");
      return;
    }

    try {
      setIsSubmitting(true);
      await createTodo(trimmedTodo);
      setTodo("");
      Keyboard.dismiss();
    } catch (error) {
      Alert.alert("Unable to add todo", "There was an internal server error while adding a todo.");
    } finally {
      setIsSubmitting(false);
    }
  }, [todo]);

  const deleteTodo = useCallback(async (id) => {
    try {
      setDeletingId(id);
      await removeTodo(id);
    } catch (error) {
      Alert.alert("Unable to delete todo", "There was an internal server error while deleting a todo.");
    } finally {
      setDeletingId((currentId) => (currentId === id ? null : currentId));
    }
  }, []);

  return useMemo(
    () => ({
      todo,
      setTodo,
      todos,
      isLoading,
      isSubmitting,
      deletingId,
      addTodo,
      deleteTodo,
    }),
    [todo, todos, isLoading, isSubmitting, deletingId, addTodo, deleteTodo]
  );
}
