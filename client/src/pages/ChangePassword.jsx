import React, { useState } from 'react';
import { changePassword } from '../axios/api';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () =>{
  const [newPassword, setNewPassword] = useState('');
  const [password, setPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username")

   const handleChangePassword = async (e) => {
      e.preventDefault();
      try {
        //console.log("username fetched: ", username)

        if (newPassword !== newPasswordConfirm){
            setError("Please try again. Confirmation not matched.");
            return;
        }
        await changePassword(username, password, newPassword);

        alert("Changed password successfully");
        navigate('/'); // Navigate to the login after register
      } catch (err) {
        setError('Change password failed');
      }
    };

    const redirectHomePage = () => {
        navigate('/')
    }
  
    return (
      <div style={{fontFamily: 'sans-serif'}}>
        <img class = "home-logo" style={{width: 50 }} src='../513-cardlogo.png' alt="logo"/>
        <div className='home-introduction'>
          <h1 class = "home-title">Welcome to Card Pairs</h1>
          <p class = "home-subtitle">A game of memory</p>
          <h1 style={{fontFamily: 'sans-serif', fontSize: 30}}>Security</h1>
          <div style={{ borderRadius: 5, border: '1px solid lightgray', padding: '12px 30px'}}>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleChangePassword}>
              <h3 style={{ marginBottom: '5px' }}>Current Password</h3>
              
              <input
                type="password"
                placeholder="Current Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: 300, padding: '8px', marginBottom: '12px', borderRadius: '4px', border: '1px solid lightgray' }}
              />

              <h3 style={{ marginBottom: '5px' }}>New Password</h3>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ padding: '8px', marginBottom: '12px', borderRadius: '4px', border: '1px solid lightgray' }}
              />

              <h3 style={{ marginBottom: '5px' }}>Confirm New Password</h3>
              
              <input
                type="password"
                placeholder="Confirm New Password"
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
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
                Save Changes
              </button>
            
              <p style={{textAlign: 'center'}} onClick={redirectHomePage} className='highlight-link'>Discard changes</p>
            </form>


          </div>

          {error && <p style={{ fontFamily: 'sans-serif', color: 'red', marginTop: '10px' }}>{error}</p>}

        </div>
      </div>
    );
}


export default ChangePassword;
