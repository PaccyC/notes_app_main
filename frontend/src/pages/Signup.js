import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../actions/authActions';

const Signup = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    dispatch(signup(userData));
  };

  return (
    <div>
      <h2>Signup</h2>
      <input type="text" name="username" onChange={handleInputChange} />
      <input type="password" name="password" onChange={handleInputChange} />
      <input type="text" name="email" onChange={handleInputChange} />
      <button onClick={handleSignup}>Signup</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;