const express = require("express");
const router = express.Router();

const {
    getMetrics,
    listUsers,
    updateUserRole,
    deleteUser,
    addCategoria,
    addEtiqueta,
    getReportes,
    resolverReporte
} = require("../controllers/admin-controller");

const { authenticate, requireRole } =
    require("../middleware/autenticacion-middleware");

// Todas requieren ser ADMIN
router.use(authenticate, requireRole(["admin"]));

// Métricas
router.get("/metrics", getMetrics);

// Gestión de usuarios
router.get("/usuarios", listUsers);
router.put("/usuarios/role/:id", updateUserRole);
router.delete("/usuarios/:id", deleteUser);

// Categorías y etiquetas
router.post("/categorias", addCategoria);
router.post("/etiquetas", addEtiqueta);

// Reportes
router.get("/reportes", getReportes);
router.put("/reportes/:id/resolver", resolverReporte);

module.exports = router;