const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const middlewareRevision = (req, res, next) => {
    const horaActual = new Date().toLocaleDateString();
    console.log(`[${horaActual}] Peticion entrante: ${req.method} ${req.url}`);
    next();
}
app.use(middlewareRevision);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Conexión exitosa a MongoDB");
})
.catch((error) => {
    console.error("Error al conectar MongoDB:", error);
});

app.get("/", (req, res) => {
    res.json({
        mensaje: "Servidor funcionando correctamente"
    });
});

// OJO: index.js está en la RAÍZ del proyecto, y las rutas viven en src/routes,
// por eso aquí sí se usa "./src/routes/..." (con "src").

const healthRoutes = require('./src/routes/salud');
app.use('/api/v1', healthRoutes);

const usuariosRoutes = require('./src/routes/usuarios.routes');
app.use('/api/v1/usuarios', usuariosRoutes);

const autoresRoutes = require('./src/routes/autores.routes');
app.use('/api/v1/autores', autoresRoutes);

const librosRoutes = require('./src/routes/libros.routes');
app.use('/api/v1/libros', librosRoutes);

const prestamosRoutes = require('./src/routes/prestamos.routes');
app.use('/api/v1/prestamos', prestamosRoutes);

const estadoRoutes = require('./src/routes/estado.routes');
app.use('/api/v1', estadoRoutes);


if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}

module.exports = app;