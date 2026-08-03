import mongoose from "mongoose";

import dns from 'dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB conectado");
    } catch (error) {
        console.error("Error al conectar a MongoDB", error);
    }
};


export { conectarDB };