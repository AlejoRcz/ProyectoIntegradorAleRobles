const Mensaje = require("../models/mensaje");

// Enviar mensaje
exports.enviarMensaje = async (req, res) => {
    try {
        const nuevo = new Mensaje({
            usuario: req.user.id,
            texto: req.body.texto
        });

        await nuevo.save();
        res.status(201).json({ message: "Mensaje enviado" });

    } catch (error) {
        res.status(500).json({ message: "Error al enviar mensaje" });
    }
};

// Obtener mensajes
exports.obtenerMensajes = async (req, res) => {
    try {
        const mensajes = await Mensaje.find()
            .sort({ fecha: -1 })
            .limit(25)
            .populate("usuario", "username profileImage");

        res.json(mensajes);

    } catch (error) {
        res.status(500).json({ message: "Error al obtener mensajes" });
    }
};