import React, { useState } from 'react';
import { register } from '../axios/api';
import { useNavigate } from 'react-router-dom';

const Register = () =>{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
   const handleRegister = async (e) => {
      e.preventDefault();
      try {
        if (password !== passwordConfirm){
            setError("Please confirmation not matched.");
            return;
        }
        await register(username, password);

        //localStorage.setItem('token', data.token);
        navigate('/login'); // Navigate to the login after register
      } catch (err) {
        setError('Register failed');
      }
    };

    const redirectLogin = () => {
        navigate('/login')
    }
  
    return (
      <div style={{fontFamily: 'sans-serif'}}>
        <img class = "home-logo" style={{width: 50 }} src='../513-cardlogo.png' alt="logo"/>
        <div className='home-introduction'>
          <h1 class = "home-title">Welcome to Card Pairs</h1>
          <p class = "home-subtitle">A game of memory</p>
          <h1 style={{fontFamily: 'sans-serif', fontSize: 30}}>Register New Account</h1>
          <div style={{ borderRadius: 5, border: '1px solid lightgray', padding: '12px 30px'}}>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleRegister}>
              <h3 style={{ marginBottom: '5px' }}>Username</h3>
              
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: 300, padding: '8px', marginBottom: '12px', borderRadius: '4px', border: '1px solid lightgray' }}
              />

              <h3 style={{ marginBottom: '5px' }}>Password</h3>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: '8px', marginBottom: '12px', borderRadius: '4px', border: '1px solid lightgray' }}
              />

              <h3 style={{ marginBottom: '5px' }}>Confirm Password</h3>
              
              <input
                type="password"
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                style={{ width: 300, padding: '8px', marginBottom: '12px', borderRadius: '4px', border: '1px solid lightgray' }}
              />

              
              <button
                type="submit"
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'rgba(87, 200, 81, 1)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  marginBottom: '10px',
                  marginTop: '10px'
                }}
              >
                Sign Up
              </button>
            
              <p style={{fontSize: 15, textAlign: 'center'}}>Already have an account? <span onClick={redirectLogin} className='highlight-link'>Login</span></p>
            </form>


          </div>

          {error && <p style={{ fontFamily: 'sans-serif', color: 'red', marginTop: '10px' }}>{error}</p>}



        </div>
      </div>
    );
  
}


export default Register;
