export const handleLogin = async (email, password, setMessage, login) => {
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

    login(data.user, data.token);
    setMessage('Login successful!');
  } catch (error) {
    setMessage(error.message);
  }
};

export const handleRegister = async (name, email, password, setMessage, login) => {
  try {
    const response = await fetch('http://localhost:3000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Failed to register');

    login(data.user, data.token);
    setMessage(data.message);
    window.location.href = '/';
  } catch (error) {
    setMessage('Something went wrong. Try again.');
  }
};

export const fetchUserData = async () => {
  const token = localStorage.getItem('token');

  if (!token || token === 'null') {
    console.error('🚨 No valid token found in localStorage');
    return null;
  }

  try {
    const response = await fetch('http://localhost:3000/api/users/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch user data');

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};
