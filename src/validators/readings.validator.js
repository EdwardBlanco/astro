import { body, query } from "express-validator";
import User from "../models/Users.model.js";

export const generateValidator = [
    body("prompt_enviado")
        .notEmpty().withMessage("El prompt_enviado es obligatorio"),
        
    body("respuesta_generada")
        .notEmpty().withMessage("La respuesta_generada es obligatoria"),
        
    body("tipo_lectura")
        .notEmpty().withMessage("El tipo_lectura es obligatorio")
        .isIn(["diaria", "general", "anual"]).withMessage("El tipo_lectura debe ser 'diaria', 'general' o 'anual'")
];

export const historyValidator = [];
