const { connectToDatabase } = require("../database/db")
const { hashPassword } = require('../utils/hashUtils');


async function registerNewUser(username, password){
  const client = await connectToDatabase();
  try{
    await client.query("SELECT * FROM users WHERE username = $1", [username]);

    const hashedPass = await hashPassword(password);

    const result = await client.query(
      "INSERT INTO users (username, password, role, points) VALUES($1, $2, $3, 0);",
      [username, hashedPass, 'user']);

    //console.log(result.rows[0]);
    return result.rows[0];
  } catch (err) {
    throw new Error("Username taken");
  } finally {
    await client.end();
  }
}


// Query for user login by username
async function getUserByUsername(username) {
  const client = await connectToDatabase();
  try {
    const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    // console.log(result.rows[0]);
    return result.rows[0];  
  } catch (err) {
    console.error('Error fetching user:', err);
    throw new Error('Failed to fetch user');
  } finally {
    await client.end();
  }
}

// Update user points in the database (coins)
async function updateUserPoints(username, additionalPoints) {
  const client = await connectToDatabase();
  try {
    const result = await client.query(
      'UPDATE users SET points = points + $1 WHERE username = $2 RETURNING *',
      [additionalPoints, username]
    );
    //console.log(result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.error('Error updating user points:', err);
    throw err;
  }
}


module.exports = {
  getUserByUsername,
  updateUserPoints,
  registerNewUser
};
