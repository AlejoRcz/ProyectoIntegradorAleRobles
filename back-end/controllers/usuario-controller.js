const Usuario = require("../models/usuario");
const Receta = require("../models/receta");

// Obtener tu propio perfil
exports.getMyProfile = async (req, res) => {
  try {
    const user = await Usuario.findById(req.user._id).select("-passwordHash");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el perfil" });
  }
};

// Vista pública de usuario
exports.getUserById = async (req, res) => {
    try {
        const user = await Usuario.findById(req.params.id)
            .select("username profileImage bio country interests followers following");

        if (!user)
            return res.status(404).json({ message: "Usuario no encontrado" });

        const recetas = await Receta.find({ autor: user._id })
            .select("titulo promedio imagenes validada");

        res.json({ usuario: user, recetas });

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

        const updatedUser = await Usuario.findByIdAndUpdate(
            req.user.id,
            fields,
            { new: true }
        );

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

        const targetUser = await Usuario.findById(targetId);
        if (!targetUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
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

// Añadir favorito
exports.addFavorite = async (req, res) => {
    try {
        const recetaId = req.params.id;

        await Usuario.findByIdAndUpdate(req.user.id, {
            $addToSet: { favoritos: recetaId }
        });

        res.json({ message: "Receta añadida a favoritos" });

    } catch (error) {
        res.status(500).json({ message: "Error al añadir favorito" });
    }
};

// Quitar favorito
exports.removeFavorite = async (req, res) => {
    try {
        const recetaId = req.params.id;

        await Usuario.findByIdAndUpdate(req.user.id, {
            $pull: { favoritos: recetaId }
        });

        res.json({ message: "Receta removida de favoritos" });

    } catch (error) {
        res.status(500).json({ message: "Error al remover favorito" });
    }
};

// Listar favoritos
exports.getFavorites = async (req, res) => {
    try {
        const user = await Usuario.findById(req.user.id)
            .populate("favoritos");

        res.json(user.favoritos);

    } catch (error) {
        res.status(500).json({ message: "Error al obtener favoritos" });
    }
};