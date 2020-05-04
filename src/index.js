//Requerir Express
const express = require('express');

//Requerir Server
const server = require('./server/server');

//Define App
const app = server(express());

//Define PORT
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
});
