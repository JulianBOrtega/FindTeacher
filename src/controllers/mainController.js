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
    login: (req, res) =>
    {
        return res.render('login', { error: req.query.error });
    },
    admin: (req, res) =>
    {
        return res.render("admin", { user: req.query.user });
    }
}