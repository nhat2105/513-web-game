import React from 'react';

const UserMenu = ({isLoggedIn, setLoggedIn, setIsUserIconClicked}) => {
//   const [error, setError] = useState('');

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
    <div className="usermenu-container">
        <button id='input-button' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;