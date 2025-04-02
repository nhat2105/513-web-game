import React, { useEffect, useState } from "react";
import { initializeSocket } from "../socket";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setGameState } from '../redux/gameSlice';
//import { useSelector } from 'react-redux';

const Join = () =>{

    const navigate = useNavigate()
    const socket = initializeSocket();
    const dispatch = useDispatch();

    const [roomName, setRoomName] = useState("")
    const [error, setError] = useState("");
    const username = localStorage.getItem("username");
    const [nickname, setNickname] = useState("")
    //var gameState = useSelector((state) => state.game.gameState)

    useEffect(() => {
        socket.on("join_room_error", (msg) => {
          setError(msg)
        })

        socket.on("game_state", (game) => {
          dispatch(setGameState(game))
        })

        socket.on("join_room_done", (msg) => {
          setError("");
          navigate(`/mgame/${roomName}`);

        })

        return () => {
            socket.off("join_room_error");
            socket.off("join_room_done");
            socket.off("game_state")
        };
    }, [error, socket, navigate, roomName, dispatch])

    function handleJoinRoom(roomName){
      if (username)socket.emit("join_room", {username: username, roomName: roomName});
      else {
        localStorage.setItem("nickname", nickname)
        socket.emit("join_room", {username: nickname, roomName: roomName})
      }
    }

    return(
        <div style={{fontFamily: 'sans-serif'}}>
        <img class = "home-logo" style={{width: 50 }} src='../513-cardlogo.png' alt=''/>
        <div className='home-introduction'>
          <h1 class = "home-title">Welcome to Card Pairs</h1>
          <p class = "home-subtitle">A game of memory</p>
          <h1 style={{fontFamily: 'sans-serif', fontSize: 30}}>Join Game</h1>
          <div style={{ borderRadius: 5, display:"flex", flexDirection: "column", 
            border: '1px solid lightgray', padding: '12px 30px'}}>

              <h3 style={{ marginBottom: '5px', width: 300 }}>Enter Room Name:</h3>
              <input
                type="text"
                placeholder="Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                style={{ padding: '8px', marginBottom: '12px', borderRadius: '4px', border: '1px solid lightgray' }}
              />

              { !username && (
                <>
                  <h3 style={{ marginBottom: '5px', width: 300 }}>Enter Nickname:</h3>
                  <input
                    type="text"
                    placeholder="Nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    style={{ padding: '8px', marginBottom: '12px', borderRadius: '4px', border: '1px solid lightgray' }}
                  />
                </>
              )}

              
              <button onClick={() => handleJoinRoom(roomName)}
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
                Join Game
              </button>

          </div>

          {error !== "" && <p style={{ fontFamily: 'sans-serif', color: 'red', marginTop: '10px' }}>{error}</p>}

        </div>
      </div>
    )
}

export default Join