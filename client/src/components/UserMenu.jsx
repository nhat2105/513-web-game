import React from 'react';
import {useNavigate } from "react-router-dom"

const UserMenu = ({isLoggedIn, setLoggedIn, setIsUserIconClicked}) => {
//   const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleLogout = async(e) => { 
    setLoggedIn(false);
    setIsUserIconClicked(false);
    e.preventDefault();
    try {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('loggedIn');
    } catch (err) {
    //   error('Logout failed');
    }
  }

  return (
    <div className="usermenu-container" style={{flexDirection: 'column'}}>
        <button id='input-button' onClick={handleLogout}>Logout</button>
        <button id="input-button" onClick={() => navigate("/password")}>Security</button>
    </div>
  );
};

export default UserMenu;