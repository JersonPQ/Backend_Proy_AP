import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Importa el middleware cors
import {PORT} from "./config.js"
import { 
    getRolUsuarios,
    getUsuarios,
    login
 } from './database.js'

 const app = express();
 // Configura body-parser como middleware
 app.use(bodyParser.json());
 
 // Habilita CORS para todas las rutas
 app.use(cors());
// ---------------------------------- Consultas ----------------------------------

// **************** RolUsuarios ****************
app.get('/getRolUsuarios', async (req, res) => {
    try {
        const rows = await getRolUsuarios()
        
        res.status(200).send(rows);
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
})

// **************** Usuarios ****************
app.get('/getUsuarios', async (req, res) => {
    try {
        const rows = await getUsuarios();

        res.status(200).send(rows);
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
})

// **************** Login ****************
app.post('/login', async (req, res) => {
    try {
        const {correo_electronico, contrasena} = req.body;
        const userData = await login(correo_electronico, contrasena);

        if (userData) {
            res.json(userData); // Devuelve los datos del usuario
        } else {
            res.status(401).send('Credenciales inválidas');
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
})


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(PORT, () => {
    console.log('Example app listening on port 8080!')
})
