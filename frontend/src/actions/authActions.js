
import axios from 'axios';

export const signup = (userData) => async (dispatch) => {
  try {
    // Make API request for signup
    const response = await axios.post('http://localhost:8000/auth/signup/', userData);
    console.log(response);
    dispatch({ type: 'SIGNUP_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'SIGNUP_FAILURE', payload: error.response.data });
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    // Make API request for login
    const response = await axios.post('http://localhost:8000/auth/login/', userData);
    console.log(response);
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
  }
};


export const logout = () => async (dispatch) => {
  try {
    await axios.post('http://localhost:8000/auth/logout/');
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
