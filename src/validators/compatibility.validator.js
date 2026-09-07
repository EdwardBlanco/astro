import { body } from "express-validator";
import User from "../models/Users.model.js";

export const checkValidator = [
    body("user_id_2")
        .notEmpty().withMessage("El user_id_2 es obligatorio")
        .isMongoId().withMessage("El user_id_2 no es un ObjectId válido")
        .custom(async (valor) => {
            const existe = await User.findById(valor);
            if (!existe) {
                throw new Error("El usuario 2 especificado no existe");
            }
            return true;
        }),
        
    body("puntaje")
        .notEmpty().withMessage("El puntaje es obligatorio")
        .isNumeric().withMessage("El puntaje debe ser un número"),
        
    body("interpretacion_ia")
        .notEmpty().withMessage("La interpretacion_ia es obligatoria")
];
