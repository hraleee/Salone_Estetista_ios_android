const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  servizio: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  data: { type: Date, required: true },
  ora: { type: String, required: true },
  stato: { type: String, enum: ['confermato', 'completato', 'cancellato'], default: 'confermato' },
  note: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
