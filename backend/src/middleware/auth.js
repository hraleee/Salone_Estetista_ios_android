const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ errore: 'Token mancante' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ errore: 'Token non valido' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.ruolo !== 'admin') {
    return res.status(403).json({ errore: 'Accesso riservato agli amministratori' });
  }
  next();
};

module.exports = { auth, adminOnly };
