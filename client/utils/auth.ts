const API_URL = import.meta.env.VITE_API_URL;

export const handleLogin = async (
  email: string,
  password: string,
  setMessage: (message: string) => void,
  login: (user: any, token: string) => void,
) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    login(data.user, data.token);
    setMessage("Login successful!");
    return data.user;
  } catch (error) {
    if (error instanceof Error) {
      setMessage(error.message);
    } else {
      setMessage("An unknown error occurred.");
    }
  }
};

export const handleRegister = async (
  name: string,
  email: string,
  password: string,
  setMessage: (message: string) => void,
  login: (user: any, token: string) => void,
) => {
  try {
    const response = await fetch(`${API_URL}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Failed to register");

    login(data.user, data.token);
    setMessage(data.message);
    window.location.href = "/";
  } catch (error) {
    setMessage("Something went wrong. Try again.");
  }
};

export const fetchUserData = async () => {
  const token = localStorage.getItem("token");

  if (!token || token === "null") {
    console.error("🚨 No valid token found in localStorage");
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/users/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch user data");

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
