const express = require("express");
const router = express.Router();

const {
    getMyProfile,
    getUserById,
    updateProfile,
    followUser,
    unfollowUser
} = require("../controllers/usuario-controller");

const { verifyToken } = require("../middlewares/autorizacion-middleware");

// Perfil propio
router.get("/me", verifyToken, getMyProfile);

// Ver otro usuario
router.get("/:id", verifyToken, getUserById);

// Actualizar perfil
router.put("/update", verifyToken, updateProfile);

// Seguir usuario
router.post("/follow/:id", verifyToken, followUser);

// Dejar de seguir usuario
router.post("/unfollow/:id", verifyToken, unfollowUser);

module.exports = router;