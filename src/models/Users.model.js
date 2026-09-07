import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    nombre_completo: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password_hash: {
        type: String,
        required: true,
        trim: true,
    },
    fecha_nacimiento: {
        type: Date,
        required: true,
    },
    fecha_registro: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true }); // agrega createdAt / updatedAt automáticamente
export default mongoose.model("User", userSchema);