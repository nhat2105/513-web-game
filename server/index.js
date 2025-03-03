const express = require("express")
const mysql = require("mysql2")
const http = require("http")
const socketIo = require("socketio")
const cors = require("cors")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")

const PORT = process.env.PORT || 5000;


const app = express()
const server = http.createServer(app)
const io = socketIo(server)

dotenv.config()

//Middlewares
app.use(cors)
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false })); 


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
  
db.connect((err) => {
    if (err) {
      console.error("Could not connect to database:", err);
      return;
    }
    console.log("Connected to the database.");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});