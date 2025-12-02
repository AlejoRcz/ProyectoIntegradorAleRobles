const Reporte = require("../models/admin-reporte");
const Receta = require("../models/receta");
const User = require("../models/usuario");

exports.crearReporte = async (req, res) => {
    try {
        const reporte = new Reporte({
            receta: req.params.id,
            usuario: req.user.id,
            descripcion: req.body.descripcion
        });

        await reporte.save();

        res.status(201).json({ message: "Reporte enviado", reporte });

    } catch (error) {
        console.log("❌ ERROR EN REPORTE:", error); 
        res.status(500).json({ message: "Error al enviar el reporte" });
    }
};