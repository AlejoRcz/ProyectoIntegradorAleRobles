const express = require("express");
const router = express.Router();

const { crearReporte } = require("../controllers/reporte-controller");
const { authenticate } = require("../middleware/autenticacion-middleware");

// Crear reporte a una receta
router.post("/:id", authenticate, crearReporte);

module.exports = router;