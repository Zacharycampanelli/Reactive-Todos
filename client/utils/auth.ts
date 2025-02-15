import { useContext } from "react";
import { AuthContext } from "../src/context/AuthContext";

export const handleLogin = async (email, password, setMessage, onClose, authContext ) => {
    try {
       const response = await fetch('http://localhost:3000/api/users/login', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ email, password }),
       });

       const data = await response.json();
    setMessage(data.message);
    
    
    if (response.ok) {
        const authContext = useContext(AuthContext);
        if (authContext) {
            authContext.login(data.user);
            onClose();
        } else {
            console.log('err')
            setMessage("Authentication context is not available.");
        }
    }
  } catch (error) {
    setMessage("Something went wrong. Try again.");
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
            onClose()
        }
    } catch (error) {
        setMessage("Something went wrong. Try again.");
    }
}


export const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Ensure token is sent
        },
      });
  
      if (!response.ok) throw new Error("Failed to fetch user data");
  
      return await response.json(); // ✅ Returns user object
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };