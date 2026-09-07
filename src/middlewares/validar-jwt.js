import jwt from "jsonwebtoken";
import User from "../models/Users.model.js";

export const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: "4h"
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject("No se pudo generar el token");
            } else {
                resolve(token);
            }
        });
    });
};

export const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            mensaje: "No hay token en la petición"
        });
    }
    
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        let usuario = await User.findById(uid);
        
        if (!usuario) {
            return res.status(401).json({
                mensaje: "Token no válido - usuario no existe en BD"
            });
        }
        
        // Si tuviéramos un campo 'estado', aquí validaríamos que esté activo
        // if (usuario.estado === 0) return res.status(401)...
        
        req.usuario = usuario;
        next();
    } catch (error) {
        res.status(401).json({
            mensaje: "Token no válido"
        });
    }
};
