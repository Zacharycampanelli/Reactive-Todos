export const handleReset = async (token, newPassword, setMessage, onSuccess) => {
  try {
    const response = await fetch('http://localhost:3000/api/users/reset/' + token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
    });

   
    const data = await response.json();
    setMessage(data.message);

    if (response.ok) {
        onSuccess()
    }
  } catch (error) {
    setMessage("Something went wrong. Try again.");
  }
};
