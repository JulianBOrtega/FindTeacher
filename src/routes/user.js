const express = require('express');
const router = express.Router();
const { profile, createUser } = require('../controllers/userController');

router
    .get('/:username', profile)
    .post('/create', createUser)

module.exports = router;