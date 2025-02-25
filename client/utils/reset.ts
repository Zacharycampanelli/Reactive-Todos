export const handleReset = async (
  token: string,
  newPassword: string,
  setMessage: (message: string) => void,
  onClose: () => void,
) => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/users/reset/" + token,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      },
    );

    const data = await response.json();
    setMessage(data.message);

    if (response.ok) {
      onClose();
    }
  } catch (error) {
    setMessage("Something went wrong. Try again.");
  }
};

export const forgotPassword = async (
  email: string,
  setMessage: (message: string) => void,
) => {
  try {
    const response = await fetch("http://localhost:3000/api/users/forgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    setMessage(data.message);
  } catch (error) {
    setMessage("Something went wrong. Try again.");
  }
};
