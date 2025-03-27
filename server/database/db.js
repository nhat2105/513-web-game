const { Client } = require('pg');
require('dotenv').config();

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

const defaultConnectionConfig = {
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: 'postgres', 
};

const clientConfig = {
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_NAME,  // Use the actual database name after ensuring it exists
};

async function createDatabaseIfNotExists() {
  const client = new Client(defaultConnectionConfig);
  try {
    await client.connect();
    console.log('Connected to PostgreSQL server.');

    // Check if the target database exists
    const res = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [DB_NAME]);
    if (res.rowCount === 0) {
      console.log(`Database "${DB_NAME}" does not exist. Creating it...`);
      await client.query(`CREATE DATABASE ${DB_NAME}`);
      console.log(`Database "${DB_NAME}" created successfully.`);
    } else {
      console.log(`Database "${DB_NAME}" already exists.`);
    }
  } catch (err) {
    console.error('Error while checking/creating the database:', err);
  } finally {
    await client.end(); // Always end the connection
  }
}

async function connectToDatabase() {
  const client = new Client(clientConfig);
  await client.connect();
  console.log(`Connected to database "${DB_NAME}" successfully!`);
  return client;
}

module.exports = {
  initialize: createDatabaseIfNotExists,
  connectToDatabase,
};
