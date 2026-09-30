const express = require('express');
const { getAll, create, update, remove } = require('../controllers/serviceController');
const { auth, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.get('/', getAll);
router.post('/', auth, adminOnly, create);
router.put('/:id', auth, adminOnly, update);
router.delete('/:id', auth, adminOnly, remove);

module.exports = router;
