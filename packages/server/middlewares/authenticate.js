// src/middlewares/authenticate.js
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, async (err, token) => {
    console.log('token', token);
    console.log('err', err);
    if (err) return res.sendStatus(403);
    const user = await User.findByPk(token.id);
    console.log('token', token);
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
