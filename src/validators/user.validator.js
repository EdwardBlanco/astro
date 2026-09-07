import { body } from "express-validator";
import User from "../models/Users.model.js";

export const registerValidator = [
    body("nombre_completo")
        .trim()
        .notEmpty().withMessage("El nombre completo es obligatorio")
        .isLength({ min: 2, max: 100 }).withMessage("El nombre completo debe tener entre 2 y 100 caracteres"),
    
    body("email")
        .trim()
        .notEmpty().withMessage("El email es obligatorio")
        .isEmail().withMessage("Debe ser un email válido")
        .custom(async (valor) => {
            const existe = await User.findOne({ email: valor.toLowerCase() });
            if (existe) {
                throw new Error("Ya existe un usuario registrado con ese email");
            }
            return true;
        }),
    
    body("password_hash")
        .trim()
        .notEmpty().withMessage("La contraseña es obligatoria")
        .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),

    body("fecha_nacimiento")
        .notEmpty().withMessage("La fecha de nacimiento es obligatoria")
        .isISO8601().withMessage("La fecha debe tener formato válido (YYYY-MM-DD)")
        .custom((valor) => {
            if (new Date(valor) > new Date()) {
                throw new Error("La fecha de nacimiento no puede ser futura");
            }
            return true;
        })
];

export const loginValidator = [
    body("email")
        .trim()
        .notEmpty().withMessage("El email es obligatorio")
        .isEmail().withMessage("Debe ser un email válido"),
    
    body("password_hash")
        .trim()
        .notEmpty().withMessage("La contraseña es obligatoria")
];
