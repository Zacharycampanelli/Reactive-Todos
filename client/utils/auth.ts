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
console.log(data)
    if (response.ok) {
        // const authContext = useContext(AuthContext);
        console.log('here', authContext)
        if (authContext) {
            const { login } = authContext;
            console.log('here', login)
            login(data.user);
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

