import React from 'react';

const UserMenu = ({isLoggedIn, setLoggedIn, setIsUserIconClicked}) => {
  const handleLogout = () => { 
    setLoggedIn(false);
    setIsUserIconClicked(false);
  }

  return (
    <div className="usermenu-container">
        <button id='input-button' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;