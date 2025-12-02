const mongoose = require("mongoose");

const eventoSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    mes: { type: Number, required: true }, // 1 a 12
    ano: { type: Number, required: true },
    imagen: { type: String, default: "" },
    activo: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model("Evento", eventoSchema);