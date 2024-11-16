const Family = require('../models/Family');

// Get all families
exports.getAllFamilies = async (req, res) => {
  try {
    const families = await Family.findAll();
    res.status(200).json(families);
  } catch (error) {
    console.error('Error retrieving families:', error);
    res.status(500).json({ error: 'Failed to retrieve families' });
  }
};

// Get a family by ID
exports.getFamilyById = async (req, res) => {
  try {
    const family = await Family.findByPk(req.params.id);
    if (family) {
      res.status(200).json(family);
    } else {
      res.status(404).json({ error: 'Family not found' });
    }
  } catch (error) {
    console.error('Error retrieving family:', error);
    res.status(500).json({ error: 'Failed to retrieve family' });
  }
};
