//Requerir Lib-Passport.js
const passport = require('passport');

//Crear Objeto
const authenticate = {};

authenticate.signup = (req, resp) =>{
  resp.render('auth/signup');
};

authenticate.signup1 =   passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
});

authenticate.profile = (req, resp) =>{
  resp.render('profile');
};

authenticate.signin = (req, resp) =>{
  resp.render('auth/signin');
};

authenticate.signin1 = (req, resp, next) =>{
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, resp, next);
};

authenticate.logout = (req, resp) =>{
  req.logOut();
  resp.redirect('/signin')
};

//Export Authentication.js
module.exports = authenticate;
