const express = require("express");
const router = express.Router();

const {
    rankingPopularidad,
    rankingValoracion,
    rankingUsuarios,
    rankingCocineros
} = require("../controllers/comunidad-controller");

const { getEventosActivos } = require("../controllers/evento-controller");

// Rankings de recetas
router.get("/ranking/popularidad", rankingPopularidad);
router.get("/ranking/valoracion", rankingValoracion);

// Rankings de usuarios
router.get("/ranking/usuarios", rankingUsuarios);
router.get("/ranking/cocineros", rankingCocineros);

// Eventos activos
router.get("/eventos", getEventosActivos);

module.exports = router;