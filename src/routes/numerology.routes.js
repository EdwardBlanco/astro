import { Router } from "express";
import { calculate, getProfile } from "../controllers/numerology.controller.js";
import { calculateValidator, profileValidator } from "../validators/numerology.validator.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();
router.post("/calculate", validarJWT, calculateValidator, validarCampos, calculate);
router.get("/profile", validarJWT, profileValidator, validarCampos, getProfile);

export default router;
