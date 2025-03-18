const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');
const routes = require('../routes/index');
const { authenticateSocket } = require("../controllers/authController")

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', routes);

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
  }
});

// io.use(authenticateSocket);

const { Games } = require('./Games');
const games = new Games();

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);
    // console.log('Authenticated user: ', socket.user.username); //

    // Handle room creation
    socket.on("create_room", ({ roomName, difficulty, count, playerName }) => {
        console.log('Received create_room:', roomName, difficulty, count, playerName);

        // Check if the room already exists
        if (!games.checkRoomName(roomName)) {
            socket.emit('error', 'Room already exists!');
            return;
        }

        // Create a new game room
        const game = games.addGame(socket.id, roomName, difficulty, count);
        games.shuffleArray(game.shuffledArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);

        // Join the room and notify everyone in the room about the creation
        socket.join(roomName);
        io.to(roomName).emit('message', `Room ${roomName} created by ${playerName}`);
        console.log(`Room ${roomName} created by ${playerName}`);

        let player = {
            username: playerName,
            roomName: roomName,
            roomID: socket.id,
            player_turn: 0,
            score: 0,
        };

        game.players.push(player);

        console.log("JUST PUSHED PLAYER INDEX: ", player.player_turn);
        io.to(roomName).emit('game_state', game); // Send the initial game state to the room 
    });

    // Player joins a room
    socket.on('join_room', ({ username, roomName }) => {
        const game = games.getGame(roomName);
        
        if (!game) {
            socket.emit('error', 'Room not found!');
            return;
        }
    
        // Add player to the game
        const player = games.addPlayer(username, roomName, game.host);
        socket.join(roomName);
        io.to(roomName).emit('message', `${username} joined room ${roomName}`);
        
        // Send updated game state to all players in the room
        io.to(roomName).emit('game_state', game);


        io.to(roomName).emit("player_index", player.player_turn);    
        console.log("Player index = ", player.player_turn)
        console.log("NUMBER OF PLAYERS CURRENTLY: ", game.players.length)
    });
    

    // Add score to a player
    socket.on('add_score', ({ roomName, username, score }) => {
        const updatedPlayers = games.addScore(roomName, username, score);
        if (updatedPlayers.error) {
            socket.emit('error', updatedPlayers.error);
            return;
        }
        io.to(roomName).emit('game_state', games.getGame(roomName)); // Broadcast updated game state with scores
    });

    // Player flips a card
    socket.on('flip_card', ({ roomName, index, playerName }) => {

        const game = games.getGame(roomName);
        if (!game) return;
        
    
        // const playerIndex = game.players.findIndex(player => player.username === playerName);
        
        if (game.players.length > 1) {
            const playerIndex = game.players.findIndex(player => player.username === playerName);
        
            if (game.currentTurnIndex !== playerIndex) {
                io.to(roomName).emit('message', 'It\'s not your turn!');
                return;
            }
        }

        // Add flipped card to flippedCards array
        if (game.flippedCards.length < 2) {
            game.flippedCards.push(index);
            io.to(roomName).emit('game_state', game); // Broadcast updated game state to all clients in the room
    
            if (game.flippedCards.length === 2) {
                const [firstIndex, secondIndex] = game.flippedCards;
                if (game.shuffledArray[firstIndex] === game.shuffledArray[secondIndex]) {
                    game.matchedPairs.push(game.shuffledArray[firstIndex]);
                    io.to(roomName).emit('message', 'Cards match!');
                    const player = game.players.find(p => p.username === playerName);
                    player.score++;
                    io.to(roomName).emit('message', 'Points = ' + player.score);
                    game.count--;
                    io.to(roomName).emit('message', "Pairs left: = " + game.count) 
                    
                    if (game.count == 0){
                        const players = game.players;
                        players.sort((a, b) => b.score - a.score);
                        io.to(roomName).emit('message', `Game Over! Winner: ${players[0].username} with ${players[0].score} points!`);
                    }
                } else {
                    io.to(roomName).emit('message', 'Cards do not match.');
                }

                if (games.players.length > 1)game.currentTurnIndex++;
            
                // Wait 1 second before resetting flipped cards and switching turn
                setTimeout(() => {
                    game.flippedCards = [];
                    if (game.players.length > 1) {
                        game.currentTurnIndex = (game.currentTurnIndex + 1) % game.players.length;  // Rotate turns for multiplayer
                    }
                    io.to(roomName).emit('game_state', game); // Update clients after delay
                }, 1000);
            } else {
                io.to(roomName).emit('game_state', game); // Update clients when a card is flipped
            }            
        }        
    });
    
    
    
    // Handle player disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});

module.exports = server;
