export const initialToDos = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/toDos/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);
    return data.todos;
  } catch (error) {
    console.error(error.message);
  }
};

interface ToDo {
  title: string;
  isDone: boolean;
  id: string;
}

export const addToDoHandler = async (title: string, isDone: boolean, userId: string): Promise<ToDo | null> => {
  try {
    const response = await fetch('http://localhost:3000/api/toDos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ title, isDone, userId }),
    });

    if (!response.ok) {
      throw new Error((await response.json()).message || 'Failed to add todo');
    }

    console.log(response.json());
    return await response.json();
  } catch (error) {
    console.error('🚨 Error adding todo:', error);
    return null;
  }
};

const toggleToDoHandler = async (
  toDoId: string,
  isDone: boolean,
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>
) => {};

const editToDoHandler = async (
  toDoId: string,
  newText: string,
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>
) => {};

export const removeToDoHandler = async (toDoId: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/toDos/${toDoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error((await response.json()).message || 'Failed to remove todo');
    }
    return await response.json();

  } catch (error) {
    console.error('🚨 Error removing todo:', error);
  }
};
