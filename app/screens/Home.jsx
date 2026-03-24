import { useContext, useMemo } from "react";
import TodoDashboard from "../components/TodoDashboard";
import { ThemeContext } from "../Contexts/ThemeContext";
import { useTodos } from "../hooks/useTodos";

export default function Home() {
  const { palette } = useContext(ThemeContext);
  const { todo, setTodo, todos, isLoading, isSubmitting, deletingId, addTodo, deleteTodo } = useTodos();

  const metrics = useMemo(
    () => [
      { label: "Active tasks", value: todos.length.toString().padStart(2, "0") },
      { label: "Sync status", value: isLoading ? "SYNC" : "LIVE" },
      { label: "Mode", value: palette.statusBarStyle === "light" ? "NIGHT" : "DAY" },
    ],
    [todos.length, isLoading, palette.statusBarStyle]
  );

  return (
    <TodoDashboard
      palette={palette}
      todo={todo}
      setTodo={setTodo}
      todos={todos}
      isLoading={isLoading}
      isSubmitting={isSubmitting}
      deletingId={deletingId}
      metrics={metrics}
      onAddTodo={addTodo}
      onDeleteTodo={deleteTodo}
    />
  );
}
