const { Games } = require('./utils');
const server = require('http').createServer();

const io = require('socket.io')(server, {
    cors: {
        origin: "*", 
    }
});

const games = new Games();

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    // Handle room creation
    socket.on("create_room", ({ roomName, difficulty, count }) => {
        console.log('Received create_room:', roomName, difficulty, count);

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
        io.to(roomName).emit('message', `Room ${roomName} created by ${socket.id}`);
        io.to(roomName).emit('game_state', game); // Send the initial game state to the room
        console.log(`Room ${roomName} created by ${socket.id}`);
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
    socket.on('flip_card', ({ roomName, index }) => {
        const game = games.getGame(roomName);
        if (!game) return;
    
        // Add flipped card to flippedCards array
        if (game.flippedCards.length < 2) {
            game.flippedCards.push(index);
            io.to(roomName).emit('game_state', game); // Broadcast updated game state
    
            // If two cards are flipped, check for match
            if (game.flippedCards.length === 2) {
                const [firstIndex, secondIndex] = game.flippedCards;
                
                setTimeout(() => {
                    if (game.shuffledArray[firstIndex] === game.shuffledArray[secondIndex]) {
                        game.matchedPairs.push(game.shuffledArray[firstIndex]);
                        io.to(roomName).emit('message', 'Cards match!');
                    } else {
                        io.to(roomName).emit('message', 'Cards do not match.');
                    }
                    // Reset flipped cards after the delay
                    game.flippedCards = [];
                    io.to(roomName).emit('game_state', game); // Update all clients with the final state
                }, 1000); // 1-second delay
            }
        }
    });
    


    // Handle player disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});

module.exports = server;
