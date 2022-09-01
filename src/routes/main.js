const express = require('express');
const router = express.Router();
const { home, register, login, admin } = require('../controllers/mainController');

const adminCheck = require('../middlewares/adminCheck');

router
    .get('/', home)
    .get('/register', register)
    .get('/login', login)
    .get('/admin', adminCheck, admin)

module.exports = router;