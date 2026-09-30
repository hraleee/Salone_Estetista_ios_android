const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descrizione: String,
  prezzo: { type: Number, required: true },
  durata: { type: Number, required: true },
  categoria: String,
  attivo: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Service', serviceSchema);
