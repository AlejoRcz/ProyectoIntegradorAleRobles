const express = require("express");
const router = express.Router();

const {
    createEvento,
    updateEvento,
    toggleEvento,
    deleteEvento,
    getAllEventos
} = require("../controllers/evento-controller");

const { authenticate, requireRole } = require("../middleware/autenticacion-middleware");

// Crear evento (admin)
router.post("/", authenticate, requireRole(["admin"]), createEvento);

// Editar evento (admin)
router.put("/:id", authenticate, requireRole(["admin"]), updateEvento);

// Activar/desactivar evento
router.patch("/:id/toggle", authenticate, requireRole(["admin"]), toggleEvento);

// Eliminar evento
router.delete("/:id", authenticate, requireRole(["admin"]), deleteEvento);

// Ver todos los eventos (admin)
router.get("/", authenticate, requireRole(["admin"]), getAllEventos);

module.exports = router;