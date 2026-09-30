const express = require('express');
const { create, getMine, getAll, updateStatus } = require('../controllers/bookingController');
const { auth, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, create);
router.get('/mie', auth, getMine);
router.get('/', auth, adminOnly, getAll);
router.put('/:id/stato', auth, adminOnly, updateStatus);

module.exports = router;
