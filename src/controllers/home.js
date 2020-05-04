//Crear Objeto
const home = {};

home.raiz = (req, resp) => {
  resp.render('index');
};

//Exportar Home
module.exports = home;
