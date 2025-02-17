export const handleLogin = async (email, password, setMessage, onClose, login) => {
  try {
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    login(data.user, data.token); // ✅ Store user & token
    setMessage('Login successful!');
  } catch (error) {
    setMessage(error.message);
  }
};

export const handleRegister = async (name, email, password, setMessage, onClose) => {
  try {
    const response = await fetch('http://localhost:3000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    setMessage(data.message);

    if (response.ok) {
      onClose();
    }
  } catch (error) {
    setMessage('Something went wrong. Try again.');
  }
};

export const fetchUserData = async () => {
  const token = localStorage.getItem('token');

  if (!token || token === 'null') {
    // ✅ Avoid making an API request if token is missing
    console.error('🚨 No valid token found in localStorage');
    return null;
  }

  try {
    const response = await fetch('http://localhost:3000/api/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch user data');

    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};
