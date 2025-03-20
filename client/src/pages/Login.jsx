import React, { useState } from 'react';
import { login } from '../axios/api';
import { useNavigate } from 'react-router-dom';


const Login = () =>{
    return(
        <body>
            <p>Username</p>
            <input type="text"/>
            <p>Password</p>
            <input type="text"/>
            <br/>
            <button>Login</button>
            <a href = "/register">create an account</a>
        </body>
    )
}

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      localStorage.setItem('token', data.token);
      navigate('/game'); // Navigate to the home page after login
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
