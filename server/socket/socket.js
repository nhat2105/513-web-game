const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');
const routes = require('../routes/index');
const { authenticateSocket } = require("../controllers/authController")

const { getUserByUsername, updateUserPoints } = require("../models/userModel")

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
    socket.on("create_room", ({ roomName, difficulty, count, playerName, max, gamestyle}) => {
        console.log('Received create_room:', roomName, difficulty, count, playerName, max, gamestyle);

        // Check if the room already exists
        if (!games.checkRoomName(roomName)) {
            socket.emit('create_room_error', 'Room already exists!'); 
            return;
        }

        // Create a new game room
        const game = games.addGame(playerName, roomName, difficulty, count, max, gamestyle);

        // Create amount of cards based on difficulty
        if(games.getGame(roomName).difficulty === "hard"){
            games.shuffleArray(game.shuffledArray = ["♠", "♣", "♥", "♦", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J",
                "♠", "♣", "♥", "♦", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J"]);
        } else if (games.getGame(roomName).difficulty === "medium"){
            games.shuffleArray(game.shuffledArray = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                "A", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
        } else {
            games.shuffleArray(game.shuffledArray = ["♠", "♣", "♥", "♦", "A", "J",
                "♠", "♣", "♥", "♦", "A", "J"]);
        }

        // Join the room and notify everyone in the room about the creation
        socket.join(roomName);
        io.to(roomName).emit('message', `Room ${roomName} created by ${playerName}`);
        //console.log(`Room ${roomName} created by ${playerName}`);

        let player = {
            username: playerName,
            roomName: roomName,
            //roomID: socket.id,
            player_turn: 0,
            score: 0,
        };

        game.players.push(player);

        console.log("JUST PUSHED PLAYER INDEX: ", player.player_turn);
        console.log(' LOOK HERE game_state',game);
        io.to(roomName).emit('game_state', game); // Send the initial game state to the room 
        socket.emit("create_room_done", `Create room ${roomName} successfully`)
    });

    // Player joins a room
    socket.on('join_room', ({ username, roomName }) => {
        const game = games.getGame(roomName);
        
        if (!game) {
            //console.log("joinroom error logged")
            socket.emit('join_room_error', 'Room not found!');
            return;
        }
    
        // Add player to the game
        // const player = games.addPlayer(username, roomName, game.host);
        const player = games.addPlayer(username, roomName);
        
        socket.join(roomName);
        io.to(roomName).emit('message', `${username} joined room ${roomName}`);
        
        // Send updated game state to all players in the room
        console.log("EMMITTING game: ", game);
        console.log("ROOM: ", roomName)
        io.to(roomName).emit('game_state', game);

        io.to(roomName).emit("player_index", player.player_turn);    
        socket.emit('join_room_done', 'Joined room successfully.');
        
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
        const room = roomName.roomName;
        //console.log("ROOM NAME: ", room)
        const game = games.getGame(room);
        //console.log("games: ", games)
       
        if (!game) {
            // console.log("FLIPPING... WAIT NO GAME")
            return
        };
    
        // const playerIndex = game.players.findIndex(player => player.username === playerName);
        
        if (game.players.length > 1) {
            const playerIndex = game.players.findIndex(player => player.username === playerName);
        
            if (game.currentTurnIndex !== playerIndex) {
                io.to(room).emit('message', 'It\'s not your turn!');
                return;
            }
        }

        // Add flipped card to flippedCards array
        if (game.flippedCards.length < 2) {
            game.flippedCards.push(index);

            io.to(room).emit('game_state', game); // Broadcast updated game state to all clients in the room
    
            if (game.flippedCards.length === 2) {
                const [firstIndex, secondIndex] = game.flippedCards;
                if (game.shuffledArray[firstIndex] === game.shuffledArray[secondIndex]) {
                    game.matchedPairs.push(game.shuffledArray[firstIndex]); //return values matched
                    io.to(room).emit('cards_match', game.matchedPairs);0
                    const player = game.players.find(p => p.username === playerName);
                    player.score++;
                    io.to(room).emit('message', 'Points = ' + player.score);
                    io.to(room).emit("points_updated", player);
                    game.count--;
                    io.to(room).emit('message', "Pairs left: = " + game.count) 
                                        
                    if (game.count == 0){
                        const players = game.players;
                        players.sort((a, b) => b.score - a.score);
                       
                        io.to(room).emit('message', `Game Over! Winner: ${players[0].username} with ${players[0].score} points!`);
                        io.to(room).emit("room_host", game.host);
                        io.to(room).emit("game_over", players);
                        // Update players points based on the number of pairs they've matched
                        for (let i = 0; i < players.length; i++){
                            var username = players[i].username;
                            var user = getUserByUsername(username);
                            if (user){ // Only updates if user exists
                                updateUserPoints(username, players[i].score);
                            }
                        }
                        games.destroyGame(room); // Destroy the game after it's over
                        console.log("DESTROYING GAME: ", room)
                       
                    }
                } else {
                    io.to(room).emit('message', 'Cards do not match.');
                }

                //if (games.players.length > 1){game.currentTurnIndex++};
            
                // Wait 1 second before resetting flipped cards and switching turn
                setTimeout(() => {
                    game.flippedCards = [];
                    if (game.players.length > 1) {
                        console.log("This is the room we are in right now",room);
                        game.currentTurnIndex = (game.currentTurnIndex + game.players.length-1) % game.players.length;  // Rotate turns for multiplayer
                        console.log("SENDING BACK CURRENT INDEX: ", game.currentTurnIndex)
                    }
                    io.to(room).emit('game_state', game); // Update clients after delay
                }, 1000);
            } 
            // else {
            //     io.to(room).emit('game_state', game); // Update clients when a card is flipped
            // }            
        }        
    });
    
    // Handle player disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});

module.exports = server;
