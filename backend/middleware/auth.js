const jwt = require('jsonwebtoken');
const  UserModel  = require('../models/User');
const mongoose = require('mongoose');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log('Decoded Token:', decoded);
    //console.log('Decoded userId:', decoded.userId, 'Type:', typeof decoded.userId);

    const userId1 = new mongoose.Types.ObjectId(decoded.userId);
    //console.log('Converted userId:', userId1);
       // console.log('User1:', decoded.userId);
    //console.log(await UserModel.findById(userId1))
    // Find user
    const user = await UserModel.findById(userId1).select('-password');
    //console.log('User:', user);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user to request object
    req.user = user;
    req.token = token;
    //console.log("user:", req.user);
    //console.log('User email:', decoded.email);
    req.userEmail = decoded.email;

    next();
  } catch (error) {
    console.error('Error in authMiddleware:', error.message);
    res.status(401).json({ message: 'Token is not valid', error: error.message });
  }
};

// Generate JWT token
const generateToken = (userId, email) => {
  
  return jwt.sign({ userId, email }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
};

module.exports = {
  authMiddleware,
  generateToken
};