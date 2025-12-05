const mongoose = require("mongoose");

// --- COMENTARIOS ---
const comentarioSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    comentario: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
});

// --- CALIFICACIONES ---
const calificacionSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    valor: { type: Number, min: 1, max: 5, required: true }
});

// --- INGREDIENTES ---
const ingredienteSchema = new mongoose.Schema({
    nombre: String,
    cantidad: Number,
    costo: Number
});

// --- RECETA PRINCIPAL ---
const recetaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: String,

    autor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },

    ingredientes: [ingredienteSchema],
    pasos: [String],

    tipo: String,
    dificultad: String,
    ocasion: String,
    origen: String,
    duracion: Number,

    costoTotal: { type: Number, default: 0 },
    presupuestoPorPorcion: Number,

    imagenes: [String],

    promedio: { type: Number, default: 0 },
    calificaciones: [calificacionSchema],
    comentarios: [comentarioSchema],

    derivadaDe: { type: mongoose.Schema.Types.ObjectId, ref: "Receta", default: null },

    validada: { type: Boolean, default: false },
    validadaPor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", default: null },
    fechaValidacion: { type: Date, default: null },

    fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Receta", recetaSchema);