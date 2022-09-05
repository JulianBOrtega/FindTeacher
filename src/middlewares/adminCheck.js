const admins = ['ada', 'vim', 'tim', 'greta'];

module.exports = (req, res, next) =>
{
    if(!res.locals.user || !admins.includes(res.locals.user.username.toLowerCase()))
    {
        return res.redirect("/");
    }
    else
    {
        next();
    }
}