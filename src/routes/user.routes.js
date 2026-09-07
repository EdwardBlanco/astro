import {
    registrarUsuario,
    iniciarSesion
} from "../controllers/user.controller.js";
import { registerValidator, loginValidator } from "../validators/user.validator.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { Router } from "express";

const router = Router();
router.post("/register", registerValidator, validarCampos, registrarUsuario);
router.post("/login", loginValidator, validarCampos, iniciarSesion);

export default router;