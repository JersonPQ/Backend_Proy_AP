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
    const rows = await getRolUsuarios()
    res.send(rows)
})

// **************** Usuarios ****************
app.get('/getUsuarios', async (req, res) => {
    const rows = await getUsuarios()
    res.send(rows)
})

// **************** Login ****************
app.get('/login', async (req, res) => {
    const {correo_electronico, contrasena} = req.body
    const rows = await login(correo_electronico, contrasena)
    if (length(res.send(rows)) === 0) {
        res.send('Usuario no encontrado')
    } else {
        res.send(rows)
    }
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(PORT, () => {
    console.log('Example app listening on port 8080!')
})
