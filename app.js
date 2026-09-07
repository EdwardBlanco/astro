import 'dotenv/config'
import express from "express";

import { conectarDB } from "./src/database/cnx_mongo.js";
import userRoutes from "./src/routes/user.routes.js";
import numerologyRoutes from "./src/routes/numerology.routes.js";
import readingsRoutes from "./src/routes/readings.routes.js";
import compatibilityRoutes from "./src/routes/compatibility.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// middleware json
app.use(express.json());
app.use(express.static("public"));

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/numerology", numerologyRoutes);
app.use("/api/v1/readings", readingsRoutes);
app.use("/api/v1/compatibility", compatibilityRoutes);

// middleware de manejo de errores no capturados (opcional pero recomendado)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ mensaje: "Error interno del servidor" });
});

conectarDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error(err);
});


