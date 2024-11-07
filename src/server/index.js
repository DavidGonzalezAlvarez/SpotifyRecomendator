const express = require("express");
const cors = require("cors");
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.EXPRESS_PORT;

// Importa las rutas desde authRoutes.js
const authRoutes = require('./authRoutes');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());

// Usa las rutas importadas
app.use(authRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
