const Receta = require("../models/receta");

// Crear receta
exports.createReceta = async (req, res) => {
    try {
        if (!req.body.ingredientes || !Array.isArray(req.body.ingredientes)) {
            return res.status(400).json({ message: "Ingredientes inválidos" });
        }

        const costoTotal = req.body.ingredientes.reduce((acc, ing) => {
            return acc + (ing.costo * (ing.cantidad || 1));
        }, 0);

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
            costoTotal,
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
        console.error("ERROR createReceta:", error);
        res.status(500).json({ message: "Error al crear receta" });
    }
};

// Crear receta derivada
exports.createRecetaDerivada = async (req, res) => {
    try {
        const original = await Receta.findById(req.params.id);
        if (!original) {
            return res.status(404).json({ message: "Receta original no encontrada" });
        }

        const derivada = new Receta({
            ...req.body,
            autor: req.user.id,
            derivadaDe: original._id,
            validada: false
        });

        await derivada.save();

        res.status(201).json({
            message: "Receta derivada creada correctamente",
            receta: derivada
        });

    } catch (error) {
        console.error("ERROR createRecetaDerivada:", error);
        res.status(500).json({ message: "Error al crear receta derivada" });
    }
};

// Obtener todas las recetas (listado)
exports.getRecetas = async (req, res) => {
    try {
        // Puedes añadir paginación/limit/skip en el futuro
        const recetas = await Receta.find()
            .populate("autor", "username profileImage")
            .select("-__v");
        res.json(recetas);
    } catch (error) {
        console.error("ERROR getRecetas:", error);
        res.status(500).json({ message: "Error al obtener recetas" });
    }
};

// Obtener una receta por ID con populates útiles
exports.getRecetaById = async (req, res) => {
    try {
        const receta = await Receta.findById(req.params.id)
            .populate("autor", "username profileImage")
            .populate("comentarios.usuario", "username profileImage")
            .populate("derivadaDe", "titulo autor");

        if (!receta)
            return res.status(404).json({ message: "Receta no encontrada" });

        res.json(receta);

    } catch (error) {
        console.error("ERROR getRecetaById:", error);
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

        // Proteger campos que no deben editar los usuarios
        const camposNoEditables = ["autor", "validada", "derivadaDe", "_id"];
        camposNoEditables.forEach(campo => {
            if (req.body.hasOwnProperty(campo)) delete req.body[campo];
        });

        if (req.body.ingredientes) {
            receta.costoTotal = req.body.ingredientes.reduce((acc, ing) => {
                return acc + (ing.costo * (ing.cantidad || 1));
            }, 0);
        }

        Object.assign(receta, req.body);
        await receta.save();

        res.json({ message: "Receta actualizada", receta });

    } catch (error) {
        console.error("ERROR updateReceta:", error);
        res.status(500).json({ message: "Error al editar receta" });
    }
};

// Eliminar receta
exports.deleteReceta = async (req, res) => {
    try {
        const receta = await Receta.findById(req.params.id);

        if (!receta)
            return res.status(404).json({ message: "Receta no encontrada" });

        // Solo autor o admin
        if (receta.autor.toString() !== req.user.id && req.user.role !== "admin")
            return res.status(403).json({ message: "No autorizado" });

        await receta.deleteOne();

        res.json({ message: "Receta eliminada" });

    } catch (error) {
        console.error("ERROR deleteReceta:", error);
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
        // opcionalmente guardamos quién y cuándo validó
        receta.validadaPor = req.user.id;
        receta.fechaValidacion = new Date();

        await receta.save();

        res.json({ message: "Receta validada correctamente", receta });

    } catch (error) {
        console.error("ERROR validarReceta:", error);
        res.status(500).json({ message: "Error al validar receta" });
    }
};

// Calificar receta
exports.calificar = async (req, res) => {
    try {
        const receta = await Receta.findById(req.params.id);

        if (!receta)
            return res.status(404).json({ message: "Receta no encontrada" });

        const valor = Number(req.body.valor);

        if (!valor || valor < 1 || valor > 5)
            return res.status(400).json({ message: "Valoración inválida" });

        const yaCalifico = receta.calificaciones.find(
            c => c.usuario.toString() === req.user.id
        );

        if (yaCalifico)
            return res.status(400).json({ message: "Ya calificaste esta receta" });

        receta.calificaciones.push({ usuario: req.user.id, valor });

        receta.promedio =
            receta.calificaciones.reduce((acc, c) => acc + c.valor, 0) /
            receta.calificaciones.length;

        await receta.save();

        res.json({
            message: "Calificación registrada",
            promedio: receta.promedio
        });

    } catch (error) {
        console.error("ERROR calificar:", error);
        res.status(500).json({ message: "Error al calificar receta" });
    }
};

// Comentar receta
exports.comentar = async (req, res) => {
    try {
        const receta = await Receta.findById(req.params.id);

        if (!receta)
            return res.status(404).json({ message: "Receta no encontrada" });

        if (!req.body.comentario || req.body.comentario.trim().length < 3)
            return res.status(400).json({ message: "Comentario demasiado corto" });

        receta.comentarios.push({
            usuario: req.user.id,
            comentario: req.body.comentario
        });

        await receta.save();

        // Devolver comentario con usuario poblado (opcional)
        const ultimo = receta.comentarios[receta.comentarios.length - 1];
        res.json({ message: "Comentario agregado", comentario: ultimo });

    } catch (error) {
        console.error("ERROR comentar:", error);
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

        const recetas = await Receta.find(filtros)
            .populate("autor", "username profileImage")
            .select("-__v");

        res.json(recetas);

    } catch (error) {
        console.error("ERROR buscar:", error);
        res.status(500).json({ message: "Error en la búsqueda" });
    }
};

// Recomendaciones
exports.recomendar = async (req, res) => {
    try {
        // Recomendamos recetas validadas, ordenadas por promedio y limit 5
        const recetas = await Receta.find({ validada: true })
            .sort({ promedio: -1 })
            .limit(5)
            .populate("autor", "username profileImage");

        res.json(recetas);

    } catch (error) {
        console.error("ERROR recomendar:", error);
        res.status(500).json({ message: "Error al obtener recomendaciones" });
    }
};