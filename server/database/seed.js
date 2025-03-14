const { hashPassword } = require('../utils/hashUtils');
const db = require('./db');
const userModel = require('../models/userModel')

async function seedDatabase() {
  const client = await db.connectToDatabase();
  try {
    // Creating the users table (if not already exists)
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL
      );
    `);

    // Insert users with hashed passwords
    const adminPass = await hashPassword('159753');
    const userPass = await hashPassword('123');

    // console.log("PUTTING IN ADMIN: ", adminPass)
    // console.log("PUTTING IN USER: ", userPass)

    // Use parameterized queries to insert the users
    await client.query(`
      INSERT INTO users (username, password, role)
      VALUES
        ($1, $2, $3),
        ($4, $5, $6)
      ON CONFLICT (username) DO NOTHING;
    `, ['admin', adminPass, 'admin', 'player1', userPass, 'user']); 

    console.log('Database seeded');

    // const username = "admin"
    // const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    // const user = result.rows[0]
    // console.log("AFter seed test: ", user)
  } catch (err) {
    console.log('Error seeding database', err);
  }
}

module.exports = {
  seedDatabase,
};
