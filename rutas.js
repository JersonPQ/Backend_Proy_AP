import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Importa el middleware cors
import {PORT} from "./config.js"
import { 
    getRolUsuarios,
    getUsuarios,
    getProyectosByUsuario,
    getProyectos,
    getCategorias,
    login,
    insertUsuario,
    insertProyecto,
    updateMontoProyecto
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
        res.status(500).send('Error en el servidor - ' + error);
    }
})

// **************** Usuarios ****************
app.get('/getUsuarios', async (req, res) => {
    try {
        const rows = await getUsuarios();

        res.status(200).send(rows);
    } catch (error) {
        res.status(500).send('Error en el servidor - ' + error);
    }
})

// **************** Login ****************
app.post('/login', async (req, res) => {
    try {
        const {correo_electronico, contrasena} = req.body;
        const rows = await login(correo_electronico, contrasena);

        if (rows.length < 1) {
            res.status(404).send('Usuario no encontrado');
        }

        res.status(200).send(rows);
    } catch (error) {
        res.status(500).send('Error en el servidor - ' + error);
    }
})

// **************** Proyectos ****************
app.get('/getProyectos/:id_usuario', async (req, res) => {
    try {
        const {id_usuario} = req.params;
        const rows = await getProyectosByUsuario(id_usuario);

        res.status(200).send(rows);
    } catch (error) {
        res.status(500).send('Error en el servidor - ' + error);
    }
})

app.get('/getProyectos', async (req, res) => {
    try {
        const rows = await getProyectos();

        res.status(200).send(rows);
    } catch (error) {
        res.status(500).send('Error en el servidor - ' + error);
    }
})

// **************** Categorias ****************
app.get('/getCategorias', async (req, res) => {
    try {
        const rows = await getCategorias();

        res.status(200).send(rows);
    } catch (error) {
        res.status(500).send('Error en el servidor - ' + error);
    }
})

// ------------------------------- Inserciones -------------------------------

// **************** Usuarios ****************
app.post('/insertUsuario', async (req, res) => {
    try {
        const {nombre_completo, cedula, correo_electronico, area_trabajo, cartera_digital, telefono, contrasena, rol} = req.body;
        await insertUsuario(nombre_completo, cedula, correo_electronico, area_trabajo, cartera_digital, telefono, contrasena, rol);

        res.status(200).send('Usuario insertado');
    } catch (error) {
        res.status(500).send('Error en el servidor - ' + error);
    }
})

// **************** Proyectos ****************
app.post('/insertProyecto', async (req, res) => {
    try {
        const {id_usuario, nombre_proyecto, descripcion, objetivo_financiacion, fecha_limite, categoria_id, imagenes_videos} = req.body;
        await insertProyecto(id_usuario, nombre_proyecto, descripcion, objetivo_financiacion, fecha_limite, categoria_id, imagenes_videos);

        res.status(200).send('Proyecto insertado');
    } catch (error) {
        res.status(500).send('Error en el servidor - ' + error);
    }
})

// ------------------------------- Actualizaciones -------------------------------

// **************** Proyectos ****************
// actualiza monto recaudado del proyecto con el monto donado, realiza suma del monto ya existente con el monto donado
app.put('/updateMontoProyecto', async (req, res) => {
    try {
        const {id_proyecto, monto} = req.body;
        await updateMontoProyecto(id_proyecto, monto);

        res.status(200).send('Monto actualizado');
    } catch (error) {
        res.status(500).send('Error en el servidor - ' + error);
    }
})


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(PORT, () => {
    console.log('Example app listening on port 8080!')
})
