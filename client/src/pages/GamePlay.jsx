import React, { useState, useEffect } from 'react';
import { socket } from "../socket/index";
import Card from "../components/Card";

const GamePlay = () => {
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [gameState, setGameState] = useState(null);
    const [canClick, setCanClick] = useState(false); // Track whether the player can click
    const enableClicking = () => setCanClick(true);
    const disableClicking = () => setCanClick(false);

    useEffect(() => {
        // socket.on('player_index', (index) => {
        //     setPlayerIndex(index);
        // });
    
        socket.on('game_state', (game) => {
            setGameState(game);
            setFlippedCards(game.flippedCards);
            setMatchedPairs(game.matchedPairs);
    
            // Check if the current player's username matches the one whose turn it is
            const currentPlayer = game.players[game.currentTurnIndex];
            if (currentPlayer && currentPlayer.username === playerName) {
                enableClicking();
            } else {
                disableClicking();
            }
        });
    
        socket.on('message', (message) => {
            console.log(message);
        });
    
        return () => {
            socket.off('game_state');
            socket.off('message');
            socket.off('player_index');
        };
    }, [playerName]); // Depend on playerName instead of playerIndex
    
    const handleCreateRoom = () => {
        socket.emit('create_room', { roomName, difficulty: 'easy', count: 8, playerName});
    };

    const handleJoinRoom = () => {
        socket.emit('join_room', { username: playerName, roomName });
    };

    const handleFlipCard = (index) => {
        if (!gameState || flippedCards.length >= 2 || !canClick || flippedCards.includes(index)) return;

        setFlippedCards((prev) => [...prev, index]); // Show card immediately
        socket.emit('flip_card', { roomName, index, playerName });

        // Reset flipped cards after 1 second if they don't match
        setFlippedCards([]);
    };

    return (
        <div>
            <h1>Memory Game</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter room name"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                />
                <button onClick={handleCreateRoom}>Create Room</button>
                <button onClick={handleJoinRoom}>Join Room</button>
            </div>

            <div className="card-grid">
                {gameState && gameState.shuffledArray.map((value, index) => (
                    <Card
                        key={index}
                        id={value}
                        value={value}
                        isClicked={flippedCards.includes(index)}
                        onClickF={() => handleFlipCard(index)}
                        matched={matchedPairs.includes(value)}
                    />
                ))}
            </div>
        </div>
    );
};

export default GamePlay;
