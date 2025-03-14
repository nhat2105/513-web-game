class Games {
    constructor() {
        this.games = []; // List of all games
        this.players = []; // List of all players
    }

    // Add a new game (room)
    addGame(hostID, roomName, difficulty, count) {
        let game = {
            host: hostID,
            room: roomName,
            difficulty: difficulty,
            count: count,
            players: [], 
            shuffledArray: [],
            matchedPairs: [],
            flippedCards: [],
            active: false, // Game starts when 2+ players join
            currentTurnIndex: 0, // Tracks whose turn it is
        };
        this.games.push(game);
        return game;
    }
    
    // Add a player to the game
    addPlayer(username, room, hostID) {
        let player = {
            username: username,
            roomName: room,
            roomID: hostID,
            player_turn: 0,
            score: 0,
        };

        this.players.push(player);

        let game = this.games.find((game) => game.room === room);
        if (game) {
            game.players.push(player);
            player.player_turn = game.players.length - 1;
            return player;
        } else {
            return { error: "Room not found" };
        }
    }

    // Shuffle cards (used to randomize the deck)
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    // Get all players for a given game
    getPlayersForGame(roomName) {
        let game = this.games.find((game) => game.room === roomName);
        return game ? game.players : [];
    }

    // Add score to a player
    addScore(room, username, score) {
        let game = this.games.find((game) => game.room === room);
        if (game) {
            let player = game.players.find((p) => p.username === username);
            if (player) {
                player.score = score;
                return game.players;
            }
        }
        return { error: "Player not found" };
    }

    // Get game data by room name
    getGame(roomName) {
        return this.games.find((game) => game.room === roomName);
    }

    // Check if room name is unique
    checkRoomName(roomName) {
        return !this.games.some((game) => game.room === roomName);
    }
}

module.exports = { Games };

