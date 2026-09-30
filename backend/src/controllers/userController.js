const User = require('../models/User');

exports.getAll = async (req, res) => {
  try {
    const users = await User.find({ ruolo: 'cliente' }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ errore: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totali = await User.countDocuments({ ruolo: 'cliente' });
    res.json({ clienti: totali });
  } catch (error) {
    res.status(500).json({ errore: error.message });
  }
};
