//Require Passport
const passport = require('passport');

//Requerir Passport-local
const localStrategy = require('passport-local').Strategy;

//Requerir Database
const pool = require('../database');

const helpers = require('../lib/helpers');

//Usar passport

passport.use('local.signin', new localStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) =>{
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if(rows.length > 0){
      const user = rows[0];
      const validPassword = await helpers.matchPassword(password, user.password);
      if(validPassword){
        done(null, user, req.flash('success', 'Welcome ' + user.username));
      } else{
        done(null, false, req.flash('denied', 'Incorrect Password'));
      }
    } else{
      return done(null, false, req.flash('denied', 'The Username does not exits'));
    }
}));

passport.use('local.signup', new localStrategy({
  //Name of the formulary signup
  usernameField: 'username',
  passwordField: 'password',
  //Ocupar req.body
  passReqToCallback: true
}, async (req, username, password, done) =>{
  const { fullname } = req.body;
  const newUser = {
    username: username,
    password: password,
    fullname: fullname
  };
  newUser.password = await helpers.encryptPassword(password);
  const result = await pool.query('INSERT INTO users SET ?', [newUser]);
  newUser.id = result.insertId;
  return done(null, newUser);
}));

passport.serializeUser((usr, done) =>{
  done(null, usr.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  done(null, rows[0]);
});
