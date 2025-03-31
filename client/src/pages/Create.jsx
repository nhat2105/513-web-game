import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import { initializeSocket } from '../socket';
import { useDispatch } from 'react-redux';
import { setGameState } from '../redux/gameSlice';

const Create = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState('');
  const [cards, setCards] = useState('');
  const [background, setBackground] = useState('');
  const [error, setError] = useState('');
  const [roomName, setRoomName] = useState("");
  const [intialGameState, setInitialGame] = useState(null);
  
  const socket = initializeSocket();
  const dispatch = useDispatch();

  const handlePlayersSelect = (option) => {
    setPlayers(option);
  };

  const handleCardsSelect = (option) => {
    setCards(option);
  };

  const handleBackgroundSelect = (option) => {
    setBackground(option);
  };

  useEffect(() => {
    socket.on("create_room_error", (msg) => {
      setError(msg);
    })

    socket.on("game_state", (game) => {
      setInitialGame(game);
      console.log("Set game: ", game)
    })

    socket.on("create_room_done", (msg) => {
      setError("");
      //console.log("inital game state before routing: ", intialGameState)
      dispatch(setGameState(intialGameState));
      navigate(`/mgame/${roomName}`);
    }) 
  })

  const createMGame = () => {
    if (players === ''){
      setError("Please select players.");
    } else if (cards === ""){
      setError("Please select number of cards.");
    } else if (background === ""){
      setError("Please select background colors.")
    } else if (roomName === ""){
      setError("Please enter a room name");
    }
    else {
      var username = localStorage.getItem('username');
      socket.emit('create_room', { roomName, difficulty: 'easy', count: 15, playerName: username });
    }
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

          <h3>Enter Room Name</h3>
          <input
            type="text"
            placeholder="Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            style={{fontFamily: 'sans-serif', width: 300, padding: '8px', fontSize:15, marginBottom: '12px', borderRadius: '4px', 
              border: '1px solid lightgray' }}
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
