import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', 
});

export const login = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const register = async (username, password) => {
  try {
    const response = await api.post('/register', { username, password});
    console.log("CONGRATS BITCH YOU'RE IN: ", response.data);
    return response.data;
  } catch (error) {
    throw new Error('Registration failed');
  }
};

export const guestLogin = async () => {
  try {
    const response = await api.get('/guest');
    return response.data.token;
  } catch (error) {
    throw new Error('Guest login failed');
  }
};
