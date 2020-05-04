//Requerir Bcrypt
const bcrypt = require('bcryptjs');

//Crear Objeto Helpers
const helpers = {};

helpers.encryptPassword = async (password) =>{
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
  try{
    return await bcrypt.compare(password, savedPassword);
  } catch(e){
    console.log(e);
  }
};

//Export Helpers
module.exports = helpers;
