const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./Controladores/usuariocontrolador');  // Verifica la ruta

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'vistas'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'publico')));

app.use('/', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
