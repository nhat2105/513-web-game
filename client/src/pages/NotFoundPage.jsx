import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () =>{
   const navigate = useNavigate();
  
    const redirectHome = () => {
        navigate('/')
    }
  
    return (
      <div style={{fontFamily: 'sans-serif'}}>
        <img class = "home-logo" style={{width: 50 }} src='../513-cardlogo.png' alt="logo"/>
        <div className='home-introduction'>
          <h1 class = "home-title">Welcome to Card Pairs</h1>
          <p class = "home-subtitle">A game of memory</p>
          <h1 style={{fontFamily: 'sans-serif', fontSize: 30}}>Page Not Found</h1>
              <button
                onClick={redirectHome}
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
                Go Home
              </button>
        </div>
      </div>
    );
  
}


export default NotFoundPage;
