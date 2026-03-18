import { db } from "../../firebase.config";

const todosCollection = db.collection("todos");

const mapSnapshot = (snapshot) =>
  snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

export function subscribeToTodos(onUpdate, onError) {
  return todosCollection.onSnapshot(
    (snapshot) => {
      onUpdate(mapSnapshot(snapshot));
    },
    (error) => {
      onError?.(error);
    }
  );
}

export async function createTodo(value) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    throw new Error("Todo value is required");
  }

  await todosCollection.add({
    todo: trimmedValue,
    createdAt: new Date().toISOString(),
  });
}

export async function removeTodo(id) {
  await todosCollection.doc(id).delete();
}
