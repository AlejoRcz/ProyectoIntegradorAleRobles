const Usuario = require("../models/usuario");

// Obtener tu propio perfil
exports.getMyProfile = async (req, res) => {
    try {
        const user = await Usuario.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el perfil" });
    }
};

// Obtener otro perfil
exports.getUserById = async (req, res) => {
    try {
        const user = await Usuario.findById(req.params.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Usuario no encontrado" });
    }
};

// Actualizar perfil
exports.updateProfile = async (req, res) => {
    try {
        const fields = {
            username: req.body.username,
            profileImage: req.body.profileImage,
            country: req.body.country,
            bio: req.body.bio,
            interests: req.body.interests
        };

        const updatedUser = await Usuario.findByIdAndUpdate(req.user.id, fields, { new: true });

        res.json({
            message: "Perfil actualizado correctamente",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar perfil" });
    }
};

// Seguir usuario
exports.followUser = async (req, res) => {
    try {
        const targetId = req.params.id;
        const userId = req.user.id;

        if (targetId === userId) {
            return res.status(400).json({ message: "No puedes seguirte a ti mismo" });
        }

        await Usuario.findByIdAndUpdate(userId, {
            $addToSet: { following: targetId }
        });

        await Usuario.findByIdAndUpdate(targetId, {
            $addToSet: { followers: userId }
        });

        res.json({ message: "Ahora sigues a este usuario" });

    } catch (error) {
        res.status(500).json({ message: "Error al seguir usuario" });
    }
};

// Dejar de seguir usuario
exports.unfollowUser = async (req, res) => {
    try {
        const targetId = req.params.id;
        const userId = req.user.id;

        await Usuario.findByIdAndUpdate(userId, {
            $pull: { following: targetId }
        });

        await Usuario.findByIdAndUpdate(targetId, {
            $pull: { followers: userId }
        });

        res.json({ message: "Ya no sigues a este usuario" });

    } catch (error) {
        res.status(500).json({ message: "Error al dejar de seguir usuario" });
    }
};