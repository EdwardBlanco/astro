import User from "../models/Users.model.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../middlewares/validar-jwt.js";
export const registrarUsuario = async (req, res) => {
    try {
        const { nombre_completo, email, password_hash, fecha_nacimiento } = req.body;
        
        const salt = bcryptjs.genSaltSync();
        const hashedPassword = bcryptjs.hashSync(password_hash, salt);
        
        const user = await User.create({
            nombre_completo, email, password_hash: hashedPassword, fecha_nacimiento
        });
        res.status(201).json({
            mensaje: "Usuario registrado con éxito",
            usuario: { _id: user._id, nombre_completo: user.nombre_completo, email: user.email }
        });
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al crear usuario", error:
                error.message
        });
    }
}


export const iniciarSesion = async (req, res) => {
    try {
        const { email, password_hash } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ mensaje: "Usuario / Password no son correctos" });
        }

        const validPassword = bcryptjs.compareSync(password_hash, user.password_hash);
        if (!validPassword) {
            return res.status(400).json({ mensaje: "Usuario / Password no son correctos" });
        }

        const token = await generarJWT(user.id);
        
        res.status(200).json({ 
            mensaje: "Usuario logueado exitosamente", 
            usuario: { _id: user._id, nombre_completo: user.nombre_completo, email: user.email }, 
            token 
        });
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al iniciar sesión",
            error: error.message
        });
    }
}