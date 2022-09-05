const { check } = require('express-validator');
const users = require('../data/dataParser').loadData('users.json');

module.exports = [
    check('username')
        .notEmpty().withMessage("Introduce your username.").bail()
        .isLength({min: 2, max: 12}).withMessage("Username must contain between 2 and 12 characters").bail()
        .custom((value) => 
        {
            if(!users.find(u => u.username === value.trim())) return true;
            else throw new Error("An account with this username already exists.");
        }),

    check('email')
        .notEmpty().withMessage("Introduce your email address.").bail()
        .isEmail().withMessage("Email isn't valid.").bail()
        .isLength({min: 3, max: 30}).withMessage("Email must contain between 3 and 30 characters")
        .custom((value) =>
        {
            if(!users.find(u => u.email.toLowerCase() === value.trim().toLowerCase())) return true;
            else throw new Error("An account with this email address already exists.");
        }),

    check('firstName')
        .notEmpty().withMessage("Introduce your first name").bail()
        .isLength({min: 2, max: 16}).withMessage("Must be between 2 and 16 characters"),

    check('lastName')
        .notEmpty().withMessage("Introduce your last name").bail()
        .isLength({min: 2, max: 16}).withMessage("Must be between 2 and 16 characters"),

    check('age')
        .notEmpty().withMessage("Introduce your age").bail()
        .isNumeric({no_symbols: true}).withMessage("Age should be a number and can't contain symbols.").bail()
        .isLength({min: 1, max: 3}).withMessage("Invalid age"),
    
    check('knowledge')
        .custom((value, {req}) =>
        {
            if(!req.body.type)
            {
                req.body.type = 'student';
                req.body.knowledge = null;
                return true;
            }
            else if (req.body.type === "student")
            {
                req.body.knowledge = null;
                return true;
            }
            else if (!value)
            {
                throw new Error("Introduce the subject that you can teach.");
            }
            else
            {
                return true;
            }
        }),
    
    check('location')
        .notEmpty().withMessage("Introduce the country where you currently live in").bail()
        .isLength({min: 2, max: 16}).withMessage("Must be between 2 and 16 characters"),

    check('password')
        .notEmpty().withMessage("Introduce your password.").bail()
        .isLength({min: 3, max: 16}).withMessage("Password must contain between 3 and 12 characters"),
    
    check('verifyPassword')
        .notEmpty().withMessage("Introduce your password once again.").bail()
        .custom((value, {req}) => 
        {
            if(value === req.body.password) return true;
            else throw new Error("Passwords don't match.");
        })
];