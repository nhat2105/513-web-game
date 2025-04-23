const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

async function registerUser(username, password){
  try{
    const user = await userModel.registerNewUser(username, password);

    if (user){
      console.log("Error: cannot register with this name")
    }
  } catch{
    throw new Error('Register failed: ' + err.message);
  }
}

async function changeUserPassword(username, oldPassword, newPassword) {
  try {
    const user = await userModel.getUserByUsername(username);
    //console.log("username: ", username)
    
    if (!user) {
      console.log("Invalid username")
      throw new Error('Invalid username');
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      console.log("Current password is wrong")
      throw new Error('Current password is wrong');
    }

    console.log("PASSWORD CORRECT")
    const data = await userModel.changePassword(username, newPassword);
    console.log("DATA REPLIED: ", data)
    return data;

  } catch (err) {
    throw new Error('Changed password failed: ' + err.message);
  }
}

async function loginUser(username, password) {
  try {
    const user = await userModel.getUserByUsername(username);
    
    if (!user) {
      console.log("Invalid username")
      throw new Error('Invalid username');
    }

    // console.log("USER FETCH: ", user)

    const isMatch = await bcrypt.compare(password, user.password);
    // console.log(user.password)
    if (!isMatch) {
      console.log("Invalid password")
      throw new Error('Invalid password');
    }

    const payload = { userId: user.id, username: user.username, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return token;
  } catch (err) {
    throw new Error('Login failed: ' + err.message);
  }
}

async function authenticateSocket(socket, next) {
  const token = socket.handshake.auth?.token; 

  if (!token) {
    return next(new Error('Authentication error'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded; 
    return next();
  } catch (err) {
    return next(new Error('Authentication error: ' + err.message));
  }
}

module.exports = { loginUser, authenticateSocket, registerUser, changeUserPassword };
