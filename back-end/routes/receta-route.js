const express = require("express");
const router = express.Router();

const {
    createReceta,
    createRecetaDerivada,
    getRecetas,
    getRecetaById,
    updateReceta,
    deleteReceta,
    validarReceta,
    calificar,
    comentar,
    buscar,
    recomendar
} = require("../controllers/receta-controller");

const { authenticate, requireRole } = require("../middleware/autenticacion-middleware");

// Crear receta
router.post("/", authenticate, createReceta);

//Receta derivada
router.post("/derivar/:id", authenticate, createRecetaDerivada);

// Obtener todas las recetas
router.get("/", getRecetas);

// Buscar
router.get("/buscar", buscar);

// Recomendadas
router.get("/recomendadas", recomendar);

// Obtener receta por ID
router.get("/:id", getRecetaById);

// Editar receta
router.put("/:id", authenticate, updateReceta);

// Eliminar receta
router.delete("/:id", authenticate, deleteReceta);

// Validar receta (chef o admin)
router.put("/validar/:id",
    authenticate,
    requireRole(["chef", "admin"]),
    validarReceta
);

// Calificar
router.post("/calificar/:id", authenticate, calificar);

// Comentar
router.post("/comentar/:id", authenticate, comentar);

module.exports = router;
