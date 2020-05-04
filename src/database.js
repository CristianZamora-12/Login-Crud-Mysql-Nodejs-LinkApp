//Require MySql
const mysql = require('mysql');

//Import Keys
const { database } = require('./key');

//Require Util
const { promisify } = require('util');

//Create at the Connection to the Sql
const pool = mysql.createPool(database);

pool.getConnection((err, connection) =>{
  if(err){
    if(err.code === 'PROTOCOLE_CONNECTION_LOST'){
      console.error('DATABASE CONNNECTION WAS CLOSED');
    }
    if(err.code === 'ER_CON_COUNT_ERROR'){
      console.error('DATABASE HAS TO MANY CONNECTIONS');
    }
    if(err.code === 'ECONNREFUSED'){
      console.error('DATABASE CONNECTION WAS REFUSED');
    }
  }
  if(connection) connection.release();
  console.log('DB is Connected');
  return;
});

pool.query = promisify(pool.query);

//Export Module
module.exports = pool;
