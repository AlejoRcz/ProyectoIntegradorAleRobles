const express = require("express");
const router = express.Router();

const {
    getMyProfile,
    getUserById,
    updateProfile,
    followUser,
    unfollowUser
} = require("../controllers/usuario-controller");

const { authenticate } = require("../middleware/autenticacion-middleware");

// Perfil propio
router.get("/me", authenticate, getMyProfile);

// Ver otro usuario
router.get("/:id", authenticate, getUserById);

// Actualizar perfil
router.put("/update", authenticate, updateProfile);

// Seguir usuario
router.post("/follow/:id", authenticate, followUser);

// Dejar de seguir usuario
router.post("/unfollow/:id", authenticate, unfollowUser);

module.exports = router;
