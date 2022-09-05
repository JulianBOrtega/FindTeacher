const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dataParser = require('../data/dataParser');
const users = dataParser.loadData('users.json');

module.exports = 
{
    home: (req, res) =>
    {
        return res.render('home');
    },
    register: (req, res) =>
    {
        return res.render('register', {profile: req.query.profile});
    },
    processRegister: (req, res) =>
    {
        let errors = validationResult(req);

        if(errors.isEmpty())
		{
            const newUser = {
                username: req.body.username.trim(),
                type: req.body.type,
                firstName: req.body.firstName.trim(),
                lastName: req.body.lastName.trim(),
                email: req.body.email.trim(),
                password: bcrypt.hashSync(req.body.password, 10),
                image: 'default-img.jpg',
                description: '',
                knowledge: req.body.knowledge ? req.body.knowledge.trim() : null,
                location: req.body.location.trim(),
                age: +req.body.age
            }

            req.session.user = 
            {
                username: newUser.username,
                email: newUser.email,
                type: newUser.type,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                image: newUser.image,
                location: newUser.location,
                age: newUser.age
            }

            req.session.color = req.body.color;

            if(req.body.rememberColor)
            {
                res.cookie('FindTeacherTheme', req.body.color,
                {
                    maxAge: 5000 * 60
                })
            }

            users.push(newUser);
            dataParser.saveData(users, 'users.json');

            return res.redirect('board');
		}
        else
        {
            return res.render('register', { errors: errors.mapped(), old: req.body, profile: req.query.profile });
        }
    },
    login: (req, res) =>
    {
        return res.render('login', { error: req.query.error });
    },
    processLogin: (req, res) =>
    {
        let errors = validationResult(req);

        if(errors.isEmpty())
		{
            let { username, email, type, firstName, lastName, image, location, age} 
                = users.find(u => u.username === req.body.username.trim());

            req.session.user = 
            {
                username,
                email,
                type,
                firstName,
                lastName,
                image: image,
                location,
                age
            }

            if(req.body.remember)
            {
                res.cookie('FindTeacher', req.session.user,
                {
                    maxAge: 5000 * 60
                })
            }

            req.session.color = req.body.color;

            if(req.body.rememberColor)
            {
                res.cookie('FindTeacherTheme', req.body.color,
                {
                    maxAge: 5000 * 60
                })
            }

            return res.redirect('board');
		}
        else
        {
            return res.render('login', { errors: errors.mapped(), old: req.body });
        }
    },
    logout: (req, res) =>
    {
        req.session.destroy();
        res.clearCookie('FindTeacher');

        return res.redirect('/');
    },
    admin: (req, res) =>
    {
        return res.render("admin", { user: req.query.user });
    }
}