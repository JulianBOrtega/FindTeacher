const { check } = require('express-validator');
const users = require('../data/dataParser').loadData('users.json');
const bcrypt = require('bcryptjs');

module.exports = [
    check('username')
        .notEmpty().withMessage("Introduce your username to login.").bail()
        .custom((value) => 
        {
            if(users.find(u => u.username === value)) return true;
            else throw new Error("An account with this username doesn't exists.");
        }),

    check('password')
        .notEmpty().withMessage("Introduce your password.").bail()
        .custom((value, {req}) => 
        {
            const user = users.find(u => u.username === req.body.username);
            if(user && bcrypt.compareSync(value, user.password)) return true;
            else throw new Error("Password doesn't match with username.");
        })
];