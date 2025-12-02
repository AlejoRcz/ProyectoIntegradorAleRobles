const Receta = require("../models/receta");
const Usuario = require("../models/usuario");

// Ranking por popularidad (más calificaciones)
exports.rankingPopularidad = async (req, res) => {
    try {
        const recetas = await Receta.find()
            .sort({ "calificaciones.length": -1 })
            .limit(10)
            .populate("autor", "username profileImage");

        res.json(recetas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener ranking de popularidad" });
    }
};

// Ranking por valoración (mejores promedios)
exports.rankingValoracion = async (req, res) => {
    try {
        const recetas = await Receta.find()
            .sort({ promedio: -1 })
            .limit(10)
            .populate("autor", "username profileImage");

        res.json(recetas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener ranking de valoración" });
    }
};

// Ranking por seguidores
exports.rankingUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.aggregate([
            {
                $project: {
                    username: 1,
                    profileImage: 1,
                    followers: 1,
                    followersCount: { $size: "$followers" }
                }
            },
            { $sort: { followersCount: -1 } },
            { $limit: 10 }
        ]);

        res.json(usuarios);

    } catch (error) {
        res.status(500).json({ message: "Error al obtener ranking de usuarios" });
    }
};

// Ranking por recetas
exports.rankingCocineros = async (req, res) => {
    try {
        const ranking = await Receta.aggregate([
            { $group: { _id: "$autor", total: { $sum: 1 } } },
            { $sort: { total: -1 } },
            { $limit: 10 }
        ]);

        const result = await Usuario.populate(ranking, {
            path: "_id",
            select: "username profileImage"
        });

        res.json(result);

    } catch (error) {
        res.status(500).json({ message: "Error al obtener cocineros más activos" });
    }
};