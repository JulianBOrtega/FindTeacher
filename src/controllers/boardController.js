module.exports = 
{
    board: (req, res) =>
    {
        if(!req.session.user) res.redirect('/login');
        
        return res.render('board');
    },
    forgetColor: (req, res) =>
    {
        res.clearCookie('FindTeacherTheme');
        delete req.session.color;
        return res.redirect('/');
    }
}