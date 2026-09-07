import mongoose from "mongoose";
// (numero_vida,
// numero_expresion, numero_alma). Referencia al ObjectId del usuario.
const NumerologyProfileSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    numero_vida: {
        type: Number,
        required: true,
    },
    numero_expresion: {
        type: Number,
        required: true,
    },
    numero_alma: {
        type: Number,
        required: true,
    }
}, { timestamps: true }); // agrega createdAt / updatedAt automáticamente
export default mongoose.model("NumerologyProfile", NumerologyProfileSchema);