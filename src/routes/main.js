const express = require('express');
const router = express.Router();
const { home, register, processRegister, login, processLogin, logout, admin } = require('../controllers/mainController');
const { board, forgetColor } = require('../controllers/boardController');

const loginVal = require('../validations/login');
const registerVal = require('../validations/register');

const adminCheck = require('../middlewares/adminCheck');
const userCheck = require('../middlewares/userCheck');
const guestCheck = require('../middlewares/guestCheck');

router
    .get('/', guestCheck, home)
    .get('/register', guestCheck, register)
    .post('/register', registerVal, processRegister)
    .get('/login', guestCheck, login)
    .post('/login', loginVal, processLogin)
    .get('/logout', logout)
    .get('/board', userCheck, board)
    .get('/board/forgetColor', forgetColor)
    .get('/admin', adminCheck, admin)

module.exports = router;