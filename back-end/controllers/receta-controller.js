const Receta = require("../models/receta");

// Crear receta
exports.createReceta = async (req, res) => {
    try {
        const receta = new Receta({
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            autor: req.user.id,
            ingredientes: req.body.ingredientes,
            pasos: req.body.pasos,
            tipo: req.body.tipo,
            dificultad: req.body.dificultad,
            ocasion: req.body.ocasion,
            origen: req.body.origen,
            duracion: req.body.duracion,
            presupuestoPorPorcion: req.body.presupuestoPorPorcion,
            imagenes: req.body.imagenes,
            derivadaDe: req.body.derivadaDe || null
        });

        await receta.save();

        res.status(201).json({
            message: "Receta creada correctamente",
            receta
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al crear receta" });
    }
};


// Obtener recetas
exports.getRecetas = async (req, res) => {
    try {
        const recetas = await Receta.find().populate("autor", "username profileImage");
        res.json(recetas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener recetas" });
    }
};

// Obtener receta por ID
exports.getRecetaById = async (req, res) => {
    try {
        const receta = await Receta.findById(req.params.id).populate("autor", "username profileImage");

        if (!receta)
            return res.status(404).json({ message: "Receta no encontrada" });

        res.json(receta);

    } catch (error) {
        res.status(500).json({ message: "Error al obtener la receta" });
    }
};

// Editar receta
exports.updateReceta = async (req, res) => {
    try {
        const receta = await Receta.findById(req.params.id);

        if (!receta)
            return res.status(404).json({ message: "Receta no encontrada" });

        if (receta.autor.toString() !== req.user.id)
            return res.status(403).json({ message: "No puedes editar esta receta" });

        Object.assign(receta, req.body);

        await receta.save();

        res.json({ message: "Receta actualizada", receta });

    } catch (error) {
        res.status(500).json({ message: "Error al editar receta" });
    }
};

// Eliminar receta
exports.deleteReceta = async (req, res) => {
    try {
        const receta = await Receta.findById(req.params.id);

        if (!receta)
            return res.status(404).json({ message: "No encontrada" });

        if (receta.autor.toString() !== req.user.id && req.user.role !== "admin")
            return res.status(403).json({ message: "No autorizado" });

        await receta.deleteOne();

        res.json({ message: "Receta eliminada" });

    } catch (error) {
        res.status(500).json({ message: "Error al eliminar receta" });
    }
};


// Validar receta (solo chef o admin)
exports.validarReceta = async (req, res) => {
    try {
        const receta = await Receta.findById(req.params.id);

        if (!receta)
            return res.status(404).json({ message: "Receta no encontrada" });

        receta.validada = true;
        await receta.save();

        res.json({ message: "Receta validada correctamente" });

    } catch (error) {
        res.status(500).json({ message: "Error al validar receta" });
    }
};

// Calificar receta
exports.calificar = async (req, res) => {
    try {
        const receta = await Receta.findById(req.params.id);

        const valor = req.body.valor;

        receta.calificaciones.push({ usuario: req.user.id, valor });

        receta.promedio =
            receta.calificaciones.reduce((acc, c) => acc + c.valor, 0) /
            receta.calificaciones.length;

        await receta.save();

        res.json({ message: "Calificación registrada", promedio: receta.promedio });

    } catch (error) {
        res.status(500).json({ message: "Error al calificar receta" });
    }
};

// Comentar receta
exports.comentar = async (req, res) => {
    try {
        const receta = await Receta.findById(req.params.id);

        receta.comentarios.push({
            usuario: req.user.id,
            comentario: req.body.comentario
        });

        await receta.save();

        res.json({ message: "Comentario agregado" });

    } catch (error) {
        res.status(500).json({ message: "Error al comentar receta" });
    }
};

// Buscar por filtros
exports.buscar = async (req, res) => {
    try {
        const { q, tipo, dificultad, ingrediente } = req.query;

        let filtros = {};

        if (q) filtros.titulo = { $regex: q, $options: "i" };
        if (tipo) filtros.tipo = tipo;
        if (dificultad) filtros.dificultad = dificultad;
        if (ingrediente) filtros["ingredientes.nombre"] = { $regex: ingrediente, $options: "i" };

        const recetas = await Receta.find(filtros).populate("autor", "username profileImage");

        res.json(recetas);

    } catch (error) {
        res.status(500).json({ message: "Error en la búsqueda" });
    }
};

// Recomendaciones
exports.recomendar = async (req, res) => {
    try {
        const recetas = await Receta.find()
            .sort({ promedio: -1 })
            .limit(5);

        res.json(recetas);

    } catch (error) {
        res.status(500).json({ message: "Error al obtener recomendaciones" });
    }
};