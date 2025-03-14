const { connectToDatabase } = require("../database/db")

// Query for user login by username
async function getUserByUsername(username) {
  const client = await connectToDatabase();
  try {
    const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];  
  } catch (err) {
    console.error('Error fetching user:', err);
    throw new Error('Failed to fetch user');
  } finally {
    await client.end();
  }
}

module.exports = {
  getUserByUsername,
};
