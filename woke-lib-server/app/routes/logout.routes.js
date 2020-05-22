module.exports = app => {
    get('/logout', (req, res) =>{
    req.session.destroy(function(){
       console.log("user logged out.")
    });
    //res.redirect('/login');
    res.end();
 })
}