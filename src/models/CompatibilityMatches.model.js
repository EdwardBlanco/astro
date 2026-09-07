import mongoose from "mongoose";

const compatibilityMatchSchema = new mongoose.Schema({
    user_id_1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    user_id_2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    puntaje: {
        type: Number,
        required: true,
    },
    interpretacion_ia: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model("CompatibilityMatch", compatibilityMatchSchema);
