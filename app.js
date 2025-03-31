const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./Controladores/usuariocontrolador');  // Asegúrate de que el nombre sea correcto

const app = express();

// Configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'vistas'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'publico')));

// Rutas
app.use('/', userRoutes);

// Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});