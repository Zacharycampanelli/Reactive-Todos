export type Todo = {
  title: string;
  completed: boolean;
  id: string;
};

export interface User {
  name: string;
  email: string;
  password: string;
  toDos: string[];
}
