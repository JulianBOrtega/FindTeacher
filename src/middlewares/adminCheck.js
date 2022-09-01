const admins = ['ada', 'vim', 'tim', 'greta'];

module.exports = (req, res, next) =>
{
    if(admins.includes(req.query.user.toLowerCase()))
    {
        next();
    }
    else
    {
        return res.redirect("/login?error=true");
    }
}