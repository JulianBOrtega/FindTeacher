module.exports = (req, res, next) =>
{
    //! User
    if(req.cookies.FindTeacher) 
    {
        res.locals.user = req.session.user = req.cookies.FindTeacher;
    }
    else if(req.session.user) 
    {
        res.locals.user = req.session.user;
    }

    //! Color
    if(req.cookies.FindTeacherTheme)
    {
        res.locals.color = req.session.color = req.cookies.FindTeacherTheme;
    }
    else if(req.session.color)
    {
        res.locals.color = req.session.color;
    }

    next();
}