const express = require("express");
const router = express.Router();

const { enviarMensaje, obtenerMensajes } =
    require("../controllers/chat-controller");

const { authenticate } = require("../middleware/autenticacion-middleware");

// Obtener mensajes
router.get("/", authenticate, obtenerMensajes);

// Enviar mensaje
router.post("/", authenticate, enviarMensaje);

module.exports = router;