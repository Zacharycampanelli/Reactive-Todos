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

type AddToDoHandler = (toDo: ToDo) => void;

export const addToDoHandler = async (title: string, addToDo: AddToDoHandler): Promise<ToDo | void> => {
  if (!title) {
    console.error('🚨 Title is required');
    return;
  }
  const userId = JSON.parse(localStorage.getItem('user') || '{}')?._id;
  if (!userId) {
    console.error('🚨 No user found in localStorage');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/toDos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ title, completed: false, userId }),
    });

    if (!response.ok) {
      throw new Error((await response.json()).message || 'Failed to add todo');
    }
    const { toDo } = await response.json();

    if (!toDo?.title) {
      console.error('🚨 API returned invalid title:', toDo);
      return;
    }

    const newToDo = {
      title: toDo.title,
      isDone: toDo.completed,
      id: toDo._id,
    };
    addToDo(newToDo);

    return newToDo;
  } catch (error) {
    console.error('🚨 Error adding todo:', error);
  }
};
