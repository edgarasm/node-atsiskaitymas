const express = require('express');
const router = express.Router();
const { validateRegistration } = require('../middleware/validator');

const {
  register,
  login,
  auction,
  addItem,
  singleItem,
  updateBid,
} = require('../controller/mainController');

router.post('/register', validateRegistration, register);
router.post('/login', login);
router.get('/auction', auction);
router.post('/addItem', addItem);
router.get('/singleItem/:id', singleItem);
router.post('/updateBid', updateBid);

module.exports = router;
