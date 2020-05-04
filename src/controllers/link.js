//Import Database MySql
const pool = require('../database');

//Crear Objeto
const links = {};

links.add = (req, resp) => {
  resp.render('links/add');
};

links.add2 = async (req, resp) =>{
  const { title, url, description } = req.body;
  const newLink = {
    title: title,
    url: url,
    descriptions: description,
    users_id: req.user.id
  };
  await pool.query('INSERT INTO links set ?', [newLink]);
  req.flash('success', 'Link Saved Successfully');
  resp.redirect('/links/');

};

links.links = async (req, resp) =>{
  const links1 = await pool.query('SELECT * FROM links WHERE users_id = ?', [req.user.id]);
  resp.render('links/list', {links1: links1});
};

links.delete = async (req, resp) => {
  const { id } = req.params;
  await pool.query('DELETE FROM links WHERE id = ?', [id]);
  req.flash('success', 'Link Removed Successfully');
  resp.redirect('/links/');
};

links.edit = async (req, resp) => {
  const { id } = req.params;
  const links2 = await pool.query('SELECT * FROM links WHERE id= ?', [id]);
  resp.render('links/edit', {links: links2[0]});
};

links.edit2 = async (req, resp) =>{
  const { id } = req.params;
  const { title, url, description } = req.body;
  const updateLinks = {
    title: title,
    url: url,
    descriptions: description
  };
  await pool.query('UPDATE links set ? WHERE id = ?', [updateLinks, id]);
  req.flash('success', 'Link Updated Successfully');
  resp.redirect('/links/');
};

//Exportar link.js
module.exports = links;
