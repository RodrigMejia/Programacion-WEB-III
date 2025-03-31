const express = require('express');
const router = express.Router();
const userModel = require('../modelo/usuariomodelo');

router.get('/', (req, res) => {
  userModel.getAll((err, results) => {
    if (err) throw err;
    res.render('index', { users: results });
  });
});

router.get('/create', (req, res) => {
  res.render('create');
});

router.post('/create', (req, res) => {
  userModel.create(req.body, err => {
    if (err) throw err;
    res.redirect('/');
  });
});

router.get('/edit/:id', (req, res) => {
  userModel.getById(req.params.id, (err, results) => {
    if (err) throw err;
    res.render('edit', { user: results[0] });
  });
});

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
