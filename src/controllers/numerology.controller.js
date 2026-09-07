import NumerologyProfile from "../models/NumerologyProfiles.model.js";

export const calculate = async (req, res) => {
    try {
        const user_id = req.usuario._id;
        const { numero_vida, numero_expresion, numero_alma } = req.body;
        const profile = await NumerologyProfile.create({ user_id, numero_vida, numero_expresion, numero_alma });
        res.status(201).json(profile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user_id = req.usuario._id;
        const profile = await NumerologyProfile.findOne({ user_id });
        if (!profile) return res.status(404).json({ mensaje: "Not found" });
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
