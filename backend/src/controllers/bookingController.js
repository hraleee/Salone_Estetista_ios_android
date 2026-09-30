const Booking = require('../models/Booking');

exports.create = async (req, res) => {
  try {
    const booking = await Booking.create({ ...req.body, cliente: req.user.id });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ errore: error.message });
  }
};

exports.getMine = async (req, res) => {
  try {
    const bookings = await Booking.find({ cliente: req.user.id }).populate('servizio');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ errore: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('cliente', 'nome email').populate('servizio');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ errore: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { stato: req.body.stato }, { new: true });
    if (!booking) return res.status(404).json({ errore: 'Prenotazione non trovata' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ errore: error.message });
  }
};
