const Evento = require("../models/evento");

// Crear evento (solo admin)
exports.createEvento = async (req, res) => {
    try {
        const { titulo, descripcion, mes, ano, imagen } = req.body;

        const evento = new Evento({
            titulo,
            descripcion,
            mes,
            ano,
            imagen: imagen || "" 
        });

        await evento.save();

        res.status(201).json({ message: "Evento creado", evento });
    } catch (error) {
        res.status(500).json({ message: "Error al crear evento" });
    }
};

// Editar evento
exports.updateEvento = async (req, res) => {
    try {
        const updated = await Evento.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated)
            return res.status(404).json({ message: "Evento no encontrado" });

        res.json({ message: "Evento actualizado", evento: updated });

    } catch (error) {
        res.status(500).json({ message: "Error al actualizar evento" });
    }
};

// Activar o desactivar evento
exports.toggleEvento = async (req, res) => {
    try {
        const evento = await Evento.findById(req.params.id);

        if (!evento)
            return res.status(404).json({ message: "Evento no encontrado" });

        evento.activo = !evento.activo;
        await evento.save();

        res.json({
            message: evento.activo
                ? "Evento activado"
                : "Evento desactivado",
            evento
        });

    } catch (error) {
        res.status(500).json({ message: "Error al cambiar estado del evento" });
    }
};

// Eliminar evento
exports.deleteEvento = async (req, res) => {
    try {
        const deleted = await Evento.findByIdAndDelete(req.params.id);

        if (!deleted)
            return res.status(404).json({ message: "Evento no encontrado" });

        res.json({ message: "Evento eliminado" });

    } catch (error) {
        res.status(500).json({ message: "Error al eliminar evento" });
    }
}

// Obtener todos los eventos (admin)
exports.getAllEventos = async (req, res) => {
    try {
        const eventos = await Evento.find().sort({ ano: -1, mes: -1 });
        res.json(eventos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener eventos" });
    }
};

// Obtener eventos activos
exports.getEventosActivos = async (req, res) => {
    try {
        const eventos = await Evento.find({ activo: true })
            .sort({ mes: 1 });

        res.json(eventos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener eventos" });
    }
};