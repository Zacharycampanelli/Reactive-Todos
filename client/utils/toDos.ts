import { Todo } from "../src/types";

const API_URL = import.meta.env.VITE_API_URL;

export const initialToDos = async () => {
  try {
    const response = await fetch(`${API_URL}/toDos/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);
    return data.todos;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred");
    }
  }
};

export const addToDoHandler = async (
  title: string,
  completed: boolean,
  userId: string,
): Promise<Todo | null> => {
  try {
    const response = await fetch(`${API_URL}/toDos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, completed, userId }),
    });

    if (!response.ok) {
      throw new Error((await response.json()).message || "Failed to add todo");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("🚨 Error adding todo:", error);
    return null;
  }
};

export const editToDoHandler = async (
  toDoId: string,
  newText?: string,
  completed?: boolean,
) => {
  const updateBody = {
    toDoId,
    newText,
    completed,
  };

  try {
    const response = await fetch(`${API_URL}/toDos/${toDoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updateBody),
    });

    if (!response.ok) {
      throw new Error(
        (await response.json()).message || "Failed to update todo",
      );
    }

    const updatedToDo = await response.json();
    return updatedToDo;
  } catch (error) {
    console.error("🚨 Error updating todo:", error);
  }
};

export const removeToDoHandler = async (toDoId: string) => {
  try {
    const response = await fetch(`${API_URL}/toDos/${toDoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        (await response.json()).message || "Failed to remove todo",
      );
    }
    return await response.json();
  } catch (error) {
    console.error("🚨 Error removing todo:", error);
  }
};
