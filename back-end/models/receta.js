const mongoose = require("mongoose");

const recetaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        default: ""
    },

    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    // Ingredientes: nombre, cantidad, costo
    ingredientes: [
        {
            nombre: String,
            cantidad: String,
            costo: Number
        }
    ],

    pasos: [
        {
            paso: String
        }
    ],

    tipo: {
        type: String,
        required: true // desayuno, almuerzo, cena, postre...
    },

    dificultad: {
        type: String,
        enum: ["Fácil", "Media", "Difícil"],
        required: true
    },

    ocasion: {
        type: String,
        default: ""
    },

    origen: {
        type: String,
        default: ""
    },

    duracion: {
        type: Number, // minutos
        required: true
    },

    presupuestoPorPorcion: {
        type: Number,
        required: true
    },

    imagenes: {
        type: [String], // hasta 3 URLs
        validate: arr => arr.length <= 3
    },

    validada: {
        type: Boolean,
        default: false
    },

    derivadaDe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Receta",
        default: null
    },

    // Calificaciones
    calificaciones: [
        {
            usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
            valor: Number
        }
    ],

    // Comentarios
    comentarios: [
        {
            usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
            comentario: String,
            fecha: { type: Date, default: Date.now }
        }
    ],

    // Puntuación total
    promedio: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Receta", recetaSchema);