//Require Express
const express = require('express');

//Ocopuded the functions Router that the module of Express
const router = express.Router();

//Importar Home.js
const home = require('../controllers/home');

//Importar Link.js
const links = require('../controllers/link');

//Import Database MySql
const pool = require('../database');

//Requerir Auth
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

//Importar Authentication.js
const authenticate = require('../controllers/authentication');

//Export Router
module.exports = app =>{
  //Raíz
  app.get('/', home.raiz);

  app.get('/links/add', isLoggedIn ,links.add);

  app.post('/links/add', isLoggedIn, links.add2);

  app.get('/links/', isLoggedIn ,links.links);

  app.get('/links/delete/:id', isLoggedIn ,links.delete);

  app.get('/links/edit/:id', isLoggedIn ,links.edit);

  app.post('/links/edit/:id', isLoggedIn ,links.edit2);

  //Users
  app.get('/signup', isNotLoggedIn, authenticate.signup);

  app.post('/signup', isNotLoggedIn, authenticate.signup1);

  app.get('/profile', isLoggedIn, authenticate.profile);

  app.get('/signin', isNotLoggedIn, authenticate.signin);

  app.post('/signin', isNotLoggedIn, authenticate.signin1);

  app.get('/logout', authenticate.logout);

  //Usar Routes
  app.use(router);
};
