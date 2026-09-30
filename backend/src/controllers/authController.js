const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { nome, email, password, telefono } = req.body;
    const esistente = await User.findOne({ email });
    if (esistente) return res.status(400).json({ errore: 'Email già registrata' });
    if (telefono) {
      const telEsistente = await User.findOne({ telefono });
      if (telEsistente) return res.status(400).json({ errore: 'Telefono già registrato' });
    }

    const hashed = await bcrypt.hash(password, 6);
    const user = await User.create({ nome, cognome: req.body.cognome, email, password: hashed, telefono });
    const token = jwt.sign({ id: user._id, ruolo: user.ruolo }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, nome: user.nome, cognome: user.cognome, email, telefono: user.telefono, ruolo: user.ruolo } });
  } catch (error) {
    res.status(500).json({ errore: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ errore: 'Credenziali non valide' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ errore: 'Credenziali non valide' });

    const token = jwt.sign({ id: user._id, ruolo: user.ruolo }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, nome: user.nome, cognome: user.cognome, email, telefono: user.telefono, ruolo: user.ruolo } });
  } catch (error) {
    res.status(500).json({ errore: error.message });
  }
};
