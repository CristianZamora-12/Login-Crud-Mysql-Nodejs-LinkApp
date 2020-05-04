//Requerir Express
const express = require('express');

//Requerir Path
const path = require('path');

//Requerir Morgan
const morgan = require('morgan');

//Requerir Express-Handlebars
const exphbs = require('express-handlebars');

//Requerir Routes
const routes = require('../routes/routes');

//Requerir MySql;
const mysql = require('mysql');

//Requerir Connect-flash
const flash = require('connect-flash');

//Require Express-session
const session = require('express-session');

//Require Express-mysql-session
const mySqlStore = require('express-mysql-session');

//Requerir Passport
const passport = require('passport');

//Requerir Lib-Passport.js
require('../lib/passport');

//Requerir Keys of Database
const { database } =  require('../key');

//Export Module
module.exports = app =>{
  //Setting

  //Setting Port
  app.set('port', process.env.PORT || 3000);

  //Estableciendo Views
  app.set('views', path.join(__dirname, '../views'));

  //Setting Engine of Handlebars
  app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('../lib/handlebars')
  }));

  //Utilizar Handlebars
  app.set('view engine', '.hbs');

  //Middleware
  app.use(session({
    secret: 'cristiansqlnodesession',
    resave: false,
    saveUninitialized: false,
    store: new mySqlStore(database)
  }));
  app.use(flash());
  app.use(morgan('dev'));
  app.use(express.urlencoded({extended: false}));
  app.use(express.json());
  //Inicializar Passport
  app.use(passport.initialize());
  app.use(passport.session());

  //Global Variable
  app.use((req, resp, next) =>{
    app.locals.success = req.flash('success');
    app.locals.denied = req.flash('denied');
    app.locals.user = req.user;
    next();
  });

  //Routes
  routes(app);

  //Static File
  app.use('/public', express.static(path.join(__dirname, '../public')));

  return app;
};
