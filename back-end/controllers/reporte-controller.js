const Reporte = require("../models/admin-reporte");
const Receta = require("../models/receta");
const User = require("../models/usuario");

exports.crearReporte = async (req, res) => {
    try {
        const recetaId = req.params.id;
        const usuarioId = req.user.id;
        const descripcion = req.body.descripcion;

        // Validar descripción
        if (!descripcion || descripcion.trim().length < 5) {
            return res.status(400).json({ message: "La descripción del reporte es muy corta" });
        }

        // Validar que la receta exista
        const receta = await Receta.findById(recetaId);
        if (!receta) {
            return res.status(404).json({ message: "La receta que intentas reportar no existe" });
        }

        // Evitar reportes duplicados por el mismo usuario
        const yaReportado = await Reporte.findOne({
            receta: recetaId,
            usuario: usuarioId
        });

        if (yaReportado) {
            return res.status(400).json({ message: "Ya has enviado un reporte sobre esta receta" });
        }

        const reporte = new Reporte({
            receta: recetaId,
            usuario: usuarioId,
            descripcion
        });

        await reporte.save();

        res.status(201).json({ 
            message: "Reporte enviado correctamente", 
            reporte 
        });

    } catch (error) {
        console.log("ERROR EN REPORTE:", error);
        res.status(500).json({ message: "Error al enviar el reporte" });
    }
};