import express from "express";
import 'dotenv/config'

import { conectarDB } from "./database/cnx_mongo.js";

const app = express();

// middleware json
app.use(express.json());


const PORT = process.env.PORT || 3000;

conectarDB();

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


