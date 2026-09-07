import CompatibilityMatch from "../models/CompatibilityMatches.model.js";

export const check = async (req, res) => {
    try {
        const user_id_1 = req.usuario._id;
        const { user_id_2, puntaje, interpretacion_ia } = req.body;
        const match = await CompatibilityMatch.create({ user_id_1, user_id_2, puntaje, interpretacion_ia });
        res.status(201).json(match);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
