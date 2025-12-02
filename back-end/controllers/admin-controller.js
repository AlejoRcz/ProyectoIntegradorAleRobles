const Usuario = require("../models/usuario");
const Categoria = require("../models/admin-categoria");
const Etiqueta = require("../models/admin-etiqueta");
const Reporte = require("../models/admin-reporte");
const Receta = require("../models/receta");

// Métricas generales
exports.getMetrics = async (req, res) => {
    try {
        const totalUsuarios = await Usuario.countDocuments();
        const totalRecetas = await Receta.countDocuments();
        const recetasValidadas = await Receta.countDocuments({ validada: true });
        const recetasPendientes = await Receta.countDocuments({ validada: false });

        res.json({
            totalUsuarios,
            totalRecetas,
            recetasValidadas,
            recetasPendientes
        });

    } catch (error) {
        res.status(500).json({ message: "Error al obtener métricas" });
    }
};

// Listar usuarios
exports.listUsers = async (req, res) => {
    try {
        const users = await Usuario.find().select("username email role createdAt");
        res.json(users);

    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
};

// Cambiar rol
exports.updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        const updated = await Usuario.findByIdAndUpdate(id, { role }, { new: true });

        res.json({
            message: "Rol actualizado",
            usuario: updated
        });

    } catch (error) {
        res.status(500).json({ message: "Error al cambiar rol" });
    }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.json({ message: "Usuario eliminado" });

    } catch (error) {
        res.status(500).json({ message: "Error al eliminar usuario" });
    }
};

// Crear categoría
exports.addCategoria = async (req, res) => {
    try {
        const nueva = new Categoria({ nombre: req.body.nombre });
        await nueva.save();
        res.json({ message: "Categoría creada", categoria: nueva });

    } catch (error) {
        res.status(500).json({ message: "Error al crear categoría" });
    }
};

// Crear etiqueta
exports.addEtiqueta = async (req, res) => {
    try {
        const nueva = new Etiqueta({ nombre: req.body.nombre });
        await nueva.save();
        res.json({ message: "Etiqueta creada", etiqueta: nueva });

    } catch (error) {
        res.status(500).json({ message: "Error al crear etiqueta" });
    }
};

// Reportes
exports.getReportes = async (req, res) => {
    try {
        const reportes = await Reporte.find()
            .populate("usuario", "username")
            .populate("receta", "titulo");

        res.json(reportes);

    } catch (error) {
        res.status(500).json({ message: "Error al obtener reportes" });
    }
};

exports.resolverReporte = async (req, res) => {
    try {
        const reporte = await Reporte.findByIdAndUpdate(
            req.params.id,
            { estado: "resuelto" },
            { new: true }
        );

        res.json({ message: "Reporte resuelto", reporte });

    } catch (error) {
        res.status(500).json({ message: "Error al resolver reporte" });
    }
};