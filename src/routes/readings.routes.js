import { Router } from "express";
import { generate, getHistory } from "../controllers/readings.controller.js";
import { generateValidator, historyValidator } from "../validators/readings.validator.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();
router.post("/generate", validarJWT, generateValidator, validarCampos, generate);
router.get("/history", validarJWT, historyValidator, validarCampos, getHistory);

export default router;
