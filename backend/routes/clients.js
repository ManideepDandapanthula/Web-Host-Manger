const express = require('express');
const router = express.Router();
const {
  getClients,
  createClient,
  deleteClient,
  updateClient,
   getClientStats,
} = require('../controllers/clientController');

const auth = require('../middleware/authMiddleware');

// 👇 All routes below are protected
router.get('/', auth, getClients);
router.post('/', auth, createClient);
router.delete('/:id', auth, deleteClient);
router.put('/:id', auth, updateClient);
router.get('/stats', auth, getClientStats);


module.exports = router;
