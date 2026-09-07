import { Router } from "express";
import { check } from "../controllers/compatibility.controller.js";
import { checkValidator } from "../validators/compatibility.validator.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();
router.post("/check", validarJWT, checkValidator, validarCampos, check);

export default router;
