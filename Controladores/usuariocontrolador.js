const express = require('express');
const router = express.Router();
const userModel = require('../modelo/usuariomodelo');

// Mostrar lista de usuarios
router.get('/', (req, res) => {
  userModel.getAll((err, results) => {
    if (err) throw err;
    res.render('index', { users: results });
  });
});

// Formulario para crear
router.get('/create', (req, res) => {
  res.render('create');
});

// Guardar usuario
router.post('/create', (req, res) => {
  userModel.create(req.body, err => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Formulario para editar
router.get('/edit/:id', (req, res) => {
  userModel.getById(req.params.id, (err, results) => {
    if (err) throw err;
    res.render('edit', { user: results[0] });
  });
});

// Actualizar usuario
router.post('/edit/:id', (req, res) => {
  userModel.update(req.params.id, req.body, err => {
    if (err) throw err;
    res.redirect('/');
  });
});

router.get('/delete/:id', (req, res) => {
  userModel.delete(req.params.id, (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

module.exports = router;
