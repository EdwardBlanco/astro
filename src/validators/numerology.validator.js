import { body, query } from "express-validator";
import User from "../models/Users.model.js";

export const calculateValidator = [
    body("numero_vida")
        .notEmpty().withMessage("El numero_vida es obligatorio")
        .isNumeric().withMessage("El numero_vida debe ser numérico"),
        
    body("numero_expresion")
        .notEmpty().withMessage("El numero_expresion es obligatorio")
        .isNumeric().withMessage("El numero_expresion debe ser numérico"),
        
    body("numero_alma")
        .notEmpty().withMessage("El numero_alma es obligatorio")
        .isNumeric().withMessage("El numero_alma debe ser numérico")
];

export const profileValidator = [];
