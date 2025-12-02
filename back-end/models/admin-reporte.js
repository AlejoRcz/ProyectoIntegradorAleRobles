const mongoose = require("mongoose");

const reporteSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    receta: { type: mongoose.Schema.Types.ObjectId, ref: "Receta", required: false },
    descripcion: { type: String, required: true },
    estado: { type: String, enum: ["pendiente", "resuelto"], default: "pendiente" }
}, { timestamps: true });

module.exports = mongoose.model("Reporte", reporteSchema);