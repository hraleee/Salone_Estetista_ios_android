const Service = require('../models/Service');

exports.getAll = async (req, res) => {
  try {
    const services = await Service.find({ attivo: true });
    res.json(services);
  } catch (error) {
    res.status(500).json({ errore: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ errore: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) return res.status(404).json({ errore: 'Servizio non trovato' });
    res.json(service);
  } catch (error) {
    res.status(500).json({ errore: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, { attivo: false }, { new: true });
    if (!service) return res.status(404).json({ errore: 'Servizio non trovato' });
    res.json({ messaggio: 'Servizio disattivato' });
  } catch (error) {
    res.status(500).json({ errore: error.message });
  }
};
