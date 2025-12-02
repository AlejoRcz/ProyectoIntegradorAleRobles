const mongoose = require("mongoose");

const etiquetaSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model("Etiqueta", etiquetaSchema);