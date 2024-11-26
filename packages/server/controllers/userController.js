const User = require('../models/User');
const { fn, col } = require('sequelize');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'familyId', 'email'],
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'familyId', 'email'],
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

// Fuzzy search users by name and email
// Search by email or name
exports.searchUsers = async (req, res) => {
  const { query, searchBy = 'name', limit = 3 } = req.query;

  if (!['name', 'email'].includes(searchBy)) {
    return res
      .status(400)
      .json({ error: 'Invalid searchBy parameter. Use "name" or "email".' });
  }

  try {
    // Find all users and order them by similarity score in descending order
    // 'fn' is used to call a database function, 'similarity' in this case, which compares the 'searchBy' column with the 'query'
    // 'col' is used to specify the column to be compared
    // 'limit' restricts the number of results returned, parsed to an integer
    const searchUsers = await User.findAll({
      order: [[fn('similarity', col(searchBy), query), 'DESC']],
      limit: parseInt(limit, 10),
      attributes: ['id', 'name', 'familyId', 'email'],
    });

    return res.status(200).json(searchUsers);
  } catch (err) {
    console.error('Error searching users:', err);
    return res
      .status(500)
      .json({ error: `Failed to search users: ${err.message}` });
  }
};

// Get own user information
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    const nonSensitiveInfo = getNonSensitiveInfo(user);
    if (user) {
      res.status(200).json(nonSensitiveInfo);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    res
      .status(500)
      .json({ error: `Failed to retrieve user profile: ${error}` });
  }
};

// Update profile information
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in req.user
    const { name, email } = req.body;
    const user = await User.findByPk(userId);
    const nonSensitiveInfo = getNonSensitiveInfo(user);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      await user.save();
      res.status(200).json(nonSensitiveInfo);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Failed to update user profile' });
  }
};

const getNonSensitiveInfo = (user) => {
  //(filter out password and slackId so sensitive info is not returned)
  // eslint-disable-next-line no-unused-vars
  const { password, slackId, ...userWithoutSensitiveInfo } = user.toJSON();
  const slackConnected = slackId ? true : false;
  return { ...userWithoutSensitiveInfo, slackConnected };
};
