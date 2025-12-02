const express = require("express");
const router = express.Router();

const {
    getMyProfile,
    getUserById,
    updateProfile,
    followUser,
    unfollowUser,
    addFavorite,
    removeFavorite,
    getFavorites
} = require("../controllers/usuario-controller");

const { authenticate } = require("../middleware/autenticacion-middleware");

// Perfil propio
router.get("/me", authenticate, getMyProfile);

//Listar favoritos del usuario
router.get("/favorites", authenticate, getFavorites);

//Añadir receta a favoritos
router.post("/favorites/add/:id", authenticate, addFavorite);

//Eliminar receta de favoritos
router.post("/favorites/remove/:id", authenticate, removeFavorite);

// Seguir usuario
router.post("/follow/:id", authenticate, followUser);

// Dejar de seguir usuario
router.post("/unfollow/:id", authenticate, unfollowUser);

// Actualizar perfil
router.put("/update", authenticate, updateProfile);

// Ver otro usuario
router.get("/:id", authenticate, getUserById);

module.exports = router;
