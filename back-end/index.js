//Dependencias, son bibliotecas que se instalan para que el servidor pueda levantarse correctamente
const express = require('express'); //Facilita la creaciÃ³n de servidores y manejo de rutas
const mongoose = require('mongoose'); //Permite conectarse a la BD de mongoDB y crear las colecciones y realizar consultas
const cors = require('cors'); //Permite la comunicaciÃ³n entre dominios diferentes
const bodyParser = require('body-parser'); //Permite interpretar los datos que vienen en la peticiÃ³n en formto json

require('dotenv').config(); //Se importa el archivo .env para poder utilizar sus variables dentro del cÃ³digo

const app = express(); //Crear una instancia de express
const PORT = process.env.PORT || 3000; //Usar el puerto indicado en .env o si no se indica usar el puerto 3000

// Importación de rutas
const authRoutes = require('./routes/autenticacion-route');
const usuarioRoutes = require('./routes/usuario-route');
const recetaRoutes = require('./routes/receta-route');
const eventoRoutes = require("./routes/evento-route");
const comunidadRoutes = require("./routes/comunidad-route");
const chatRoutes = require("./routes/chat-route");
const adminRoutes = require("./routes/admin-route");
const reporteRoutes = require("./routes/reporte-route");

app.use(express.json());//Habilita el manejo de JSON en las peticiones
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());//Habilita el anÃ¡lisis de JSON en las peticiones 
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
    .then(()=> console.log('MongoDB Atlas conectado'))
    .catch(error => console.log('Error al conectarse con MongoDB: ', error));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/recetas', recetaRoutes);
app.use("/api/eventos", eventoRoutes);
app.use("/api/comunidad", comunidadRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reportes", reporteRoutes);

app.get('/', (req,res)=> {
    res.send('Servidor en funcionamiento - Proyecto Gestión Culinaria');
});

// Manejo de errores generales
app.use((error, req, res, next) => {
  console.error("Error interno:", error);
  res.status(500).json({
    message: "Ocurrió un error interno en el servidor",
    error: error.message,
  });
});

app.listen(PORT, ()=>{
    console.log('Servidor corriendo en http://localhost:' + PORT);
});