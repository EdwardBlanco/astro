import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
    endpoint: {
        type: String,
        required: true,
    },
    metodo: {
        type: String,
        required: true,
    },
    status_code: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });

export default mongoose.model("AuditLog", auditLogSchema);
