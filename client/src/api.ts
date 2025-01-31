
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
const BASE_URL = 'http://localhost:5001/api';

// Login 
export const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

// Fetch Firebase Token
export const fetchFirebaseToken = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');
  return user.getIdToken();
};

// Fetch Profile
export const fetchProfile = async () => {
    const token = await fetchFirebaseToken();

    const response = await fetch(`${BASE_URL}/users/profile`, {
        headers: { 
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) throw new Error('Failed to fetch profile');
    return await response.json();
}

export const getTasks = async () => {
  const token = await fetchFirebaseToken();
  const response = await fetch(`${BASE_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Failed to fetch tasks');
  return await response.json();
};

export const createTask = async (title: string, isDone = false) => {
  const token = await fetchFirebaseToken();
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, isDone }),
  });

  if (!response.ok) throw new Error('Failed to create task');
  return await response.json();
};

export const updateTask = async (taskId: string, title: string, isDone: boolean) => {
  const token = await fetchFirebaseToken();
  const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, isDone }),
  });

  if (!response.ok) throw new Error('Failed to update task');
};

export const deleteTask = async (taskId: string) => {
  const token = await fetchFirebaseToken();
  const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Failed to delete task');
  return await response.json();
};
