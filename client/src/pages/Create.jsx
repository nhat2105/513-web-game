import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import { initializeSocket } from '../socket';

const Create = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState('');
  const [cards, setCards] = useState('');
  const [background, setBackground] = useState('');
  const [error, setError] = useState('');
  

  const handlePlayersSelect = (option) => {
    setPlayers(option);
  };

  const handleCardsSelect = (option) => {
    setCards(option);
  };

  const handleBackgroundSelect = (option) => {
    setBackground(option);
  };

  const createMGame = () => {
    if (players === ''){
      setError("Please select players.");
    } else if (cards === ""){
      setError("Please select number of cards.");
    } else if (background === ""){
      setError("Please select background colors.")
    } 
    else navigate("/mgame");
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <img
        className="home-logo"
        style={{ width: 50 }}
        src='../513-cardlogo.png'
        alt="logo"
      />
      <div className="home-introduction">
        <h1 className="home-title">Welcome to Card Pairs</h1>
        <p className="home-subtitle">A game of memory</p>
        <h1 style={{ fontFamily: 'sans-serif', fontSize: 30 }}>Host New Game</h1>
        <div style={{ borderRadius: 5, border: '1px solid lightgray', padding: '12px 30px'}}>
          <h3>Select Number of Players</h3>
          <Dropdown
            label={`Number of Players: ${players || ''}`}
            options={['1', '2', '3', '4', '5']}
            onSelect={handlePlayersSelect}
          />

          <h3>Choose Number of Cards</h3>
          <Dropdown
            label={`Number of Cards: ${cards || ''}`}
            options={['28', '30', '32']}
            onSelect={handleCardsSelect}
          />

          <h3>Choose Background Color</h3>
          <Dropdown
            label={`Background Color: ${background || ''}`}
            options={['Red', 'Green', 'Blue']}
            onSelect={handleBackgroundSelect}
          />

        <div style={{justifySelf: 'center', marginBottom: 10}}>
          <button
            onClick={createMGame}
            type="button"
            style={{
              padding: '10px 20px',
              backgroundColor: 'rgba(87, 200, 81, 1)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              marginTop: '20px',
              justifySelf: 'center',
            }}
          >
            Host New Game
          </button>
        </div>
            {error !== "" && <p style={{color: 'red'}}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Create;
