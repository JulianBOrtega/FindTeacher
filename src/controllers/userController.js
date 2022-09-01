module.exports = 
{
    profile: (req, res) =>
    {
        return res.render('profile', {username: req.params.username});
    }
}