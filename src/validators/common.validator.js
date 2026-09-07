import { param } from "express-validator";

export const idValidator = [
    param("id")
        .isMongoId().withMessage("El id proporcionado no es un ObjectId válido de MongoDB"),
];
