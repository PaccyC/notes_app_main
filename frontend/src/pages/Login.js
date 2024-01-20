import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../actions/authActions';

const Login = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const [userData, setUserData] = useState({
    username: '',
    password: '',

  });

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    dispatch(login(userData));
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" name="username" onChange={handleInputChange} />
      <input type="password" name="password" onChange={handleInputChange} />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;