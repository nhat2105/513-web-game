const server = require("./socket/socket");
const db = require("./database/db")
const { seedDatabase } = require("./database/seed")

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

async function start() {
    await db.initialize();
    await seedDatabase(); 
  }
  
start()
