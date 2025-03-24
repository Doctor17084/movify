import axios from 'axios';

// რეგისტრაციის ფუნქცია
export const registerUser = async (username, password, email) => {
  try {
    console.log("Sending registration data:", { username, email, password });
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      username,
      email,
      password
    });
    console.log("Registration response:", response.data);
    return response.data; // დაბრუნება სერვერიდან მიღებული მონაცემების
  } catch (error) {
    console.error("Error registering user:", error);
    throw error; // შეცდომის გადასაწყვეტი
  }
};

// ლოგინის ფუნქცია (მომხმარებლის სახელი ან ელ.ფოსტა)
export const loginUser = async (username, email, password) => {
  try {
    console.log("Sending login data:", { username, email, password });
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      username, 
      email,
      password
    });
    console.log("Login response:", response.data);
    return response.data; // დაბრუნება სერვერიდან მიღებული მონაცემების (ტოკენი)
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error; // შეცდომის გადასაწყვეტი
  }
};
