import Reading from "../models/Readings.model.js";

export const generate = async (req, res) => {
    try {
        const user_id = req.usuario._id;
        const { prompt_enviado, respuesta_generada, tipo_lectura } = req.body;
        const reading = await Reading.create({ user_id, prompt_enviado, respuesta_generada, tipo_lectura });
        res.status(201).json(reading);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getHistory = async (req, res) => {
    try {
        const user_id = req.usuario._id;
        const readings = await Reading.find({ user_id });
        res.status(200).json(readings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
