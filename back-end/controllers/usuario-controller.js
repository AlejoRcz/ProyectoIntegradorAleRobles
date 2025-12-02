const Usuario = require("../models/usuario");
const Receta = require("../models/receta");

// Obtener tu propio perfil
exports.getMyProfile = async (req, res) => {
    try {
        const user = await Usuario.findById(req.user._id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el perfil" });
    }
};

// Obtener vista pública de un usuario
exports.getUserById = async (req, res) => {
    try {
        const user = await Usuario.findById(req.params.id)
            .select("username profileImage bio country interests followers following");

        if (!user)
            return res.status(404).json({ message: "Usuario no encontrado" });

        // Obtener recetas públicas del usuario
        const recetas = await Receta.find({ autor: user._id })
            .select("titulo promedio imagenes validada");

        res.json({
            usuario: user,
            recetas: recetas
        });

    } catch (error) {
        res.status(500).json({ message: "Error al obtener perfil público" });
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

        const updatedUser = await Usuario.findByIdAndUpdate(req.user._id, fields, { new: true });

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
        const userId = req.user._id;

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
        const userId = req.user._id;

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

// Añadir receta a favoritos
exports.addFavorite = async (req, res) => {
    try {
        const recetaId = req.params.id;

        await Usuario.findByIdAndUpdate(req.user._id, {
            $addToSet: { favoritos: recetaId }
        });

        res.json({ message: "Receta añadida a favoritos" });

    } catch (error) {
        res.status(500).json({ message: "Error al añadir favorito" });
    }
};


// Quitar receta de favoritos
exports.removeFavorite = async (req, res) => {
    try {
        const recetaId = req.params.id;

        await Usuario.findByIdAndUpdate(req.user._id, {
            $pull: { favoritos: recetaId }
        });

        res.json({ message: "Receta removida de favoritos" });

    } catch (error) {
        res.status(500).json({ message: "Error al remover favorito" });
    }
};


// Listar mis favoritos
exports.getFavorites = async (req, res) => {
    try {
        const user = await Usuario.findById(req.user._id)
            .populate("favoritos");

        res.json(user.favoritos);

    } catch (error) {
        res.status(500).json({ message: "Error al obtener favoritos" });
    }
};