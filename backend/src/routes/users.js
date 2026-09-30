const express = require('express');
const { getAll, getStats } = require('../controllers/userController');
const { auth, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, adminOnly, getAll);
router.get('/stats', auth, adminOnly, getStats);

module.exports = router;
