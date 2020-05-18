User.find({ 'username': username,'email':email }, function(err, user) {
    if (err) {
    console.log('Signup error');
    return done(err);
    }
    //if user found.
    if (user.length!=0) {
    if(user[0].username){
    console.log('Username already exists, username: ' + username);
    }else{
    console.log('EMAIL already exists, email: ' + email);
    }
    var err = new Error();
    err.status = 310;
    return done(err);
    }