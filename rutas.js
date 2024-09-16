import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Importa el middleware cors
import {PORT} from "./config.js"
import { 
    getRolUsuarios,
    getUsuarios,
    getUsuarioById,
    getProyectosByUsuario,
    getProyectos,
    getCategorias,
    login,
    validarFondosSuficientesUsuario,
    getDonaciones,
    getEstadisticas,
    getProyectoById,
    insertUsuario,
    insertProyecto,
    insertDonacion,
    updateProyecto,
    updateMontoProyecto,
    updateNombreProyecto,
    updateDescripcionProyecto,
    updateObjetivoFinanciacionProyecto,
    updateFechaLimiteProyecto,
    updateCategoriaProyecto,
    activarCuentaUsuario,
    desactivarCuentaUsuario,
    updateCarteraDigitalUsuario
 } from './database.js'

 const app = express();
 // Configura body-parser como middleware
 app.use(bodyParser.json());
 
 // Habilita CORS para todas las rutas
 app.use(cors());

app.get('/', (req, res) => {
    res.send('Proyecto de Administración de Proyectos');
})

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

app.get('/getUsuario/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const rows = await getUsuarioById(id);

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

app.get('/getProyecto/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const rows = await getProyectoById(id);

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

// **************** Validar Fondos Suficientes Usuario ****************
app.get('/validarFondosSuficientesUsuario/:id_usuario/:monto', async (req, res) => {
    try {
        const {id_usuario, monto} = req.params;
        const rows = await validarFondosSuficientesUsuario(id_usuario, monto);

        const result = rows.length > 0 ? true : false;

        res.status(200).send({ result });
    } catch (error) {
        res.status(500).send({ result: false, mensaje: 'Error en el servidor - ' + error });
    }
})

// **************** Donaciones ****************
app.get('/getDonaciones', async (req, res) => {
    try {
        const rows = await getDonaciones();

        res.status(200).send(rows);
    } catch (error) {
        res.status(500).send('Error en el servidor - ' + error);
    }
})

// **************** Estadisticas ****************
app.get('/getEstadisticas', async (req, res) => {
    try {
        const rows = await getEstadisticas();

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

// **************** Donaciones ****************
app.post('/insertDonacion', async (req, res) => {
    try {
        const {id_usuario, id_proyecto, monto_donado} = req.body;
        await insertDonacion(id_usuario, id_proyecto, monto_donado);

        res.status(200).send({ result: true, mensaje: 'Donacion realizada' });
    } catch (error) {
        res.status(500).send({ result: false, mensaje: 'Error en el servidor - ' + error });
    }
})

// ------------------------------- Actualizaciones -------------------------------

// **************** Proyectos ****************
app.put('/updateProyecto', async (req, res) => {
    try {
        const {id_proyecto, nombre_proyecto, descripcion, objetivo_financiacion, fecha_limite, categoria_id} = req.body;
        await updateProyecto(id_proyecto, nombre_proyecto, descripcion, objetivo_financiacion, fecha_limite, categoria_id);

        res.status(200).send('Proyecto actualizado');
    } catch (error) {
        res.status(500).send('Error en el servidor - ' + error);
    }
})

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

app.put('/updateNombreProyecto', async (req, res) => {
    try {
        const {id_proyecto, nombre_proyecto} = req.body;
        await updateNombreProyecto(id_proyecto, nombre_proyecto);

        res.status(200).send('Nombre actualizado');
    } catch (error) {
        res.status(500).send('Error en el servidor - ' + error);
    }
})

app.put('/updateDescripcionProyecto', async (req, res) => {
    try {
        const {id_proyecto, descripcion} = req.body;
        await updateDescripcionProyecto(id_proyecto, descripcion);

        res.status(200).send('Descripcion actualizada');
    } catch (error) {
        res.status(500).send('Error en el servidor - ' + error);
    }
})

app.put('/updateObjetivoFinanciacionProyecto', async (req, res) => {
    try {
        const {id_proyecto, objetivo_financiacion} = req.body;
        await updateObjetivoFinanciacionProyecto(id_proyecto, objetivo_financiacion);

        res.status(200).send('Objetivo de financiacion actualizado');
    } catch (error) {
        res.status(500).send('Error en el servidor - ' + error);
    }
})

app.put('/updateFechaLimiteProyecto', async (req, res) => {
    try {
        const {id_proyecto, fecha_limite} = req.body;
        await updateFechaLimiteProyecto(id_proyecto, fecha_limite);

        res.status(200).send('Fecha limite actualizada');
    } catch (error) {
        res.status(500).send('Error en el servidor - ' + error);
    }
})

app.put('/updateCategoriaProyecto', async (req, res) => {
    try {
        const {id_proyecto, categoria_id} = req.body;
        await updateCategoriaProyecto(id_proyecto, categoria_id);

        res.status(200).send('Categoria actualizada');
    } catch (error) {
        res.status(500).send('Error en el servidor - ' + error);
    }
})

// ************************** Usuarios **************************
app.put('/activarCuentaUsuario', async (req, res) => {
    try {
        const {id_usuario} = req.body;
        await activarCuentaUsuario(id_usuario);

        res.status(200).send('Cuenta activada');
    } catch (error) {
        res.status(500).send('Error en el servidor - ' + error);
    }
})

app.put('/desactivarCuentaUsuario', async (req, res) => {
    try {
        const {id_usuario} = req.body;
        await desactivarCuentaUsuario(id_usuario);

        res.status(200).send('Cuenta desactivada');
    } catch (error) {
        res.status(500).send('Error en el servidor - ' + error);
    }
})

app.put('/updateCarteraDigitalUsuario', async (req, res) => {
    try {
        const {id_usuario, monto} = req.body;
        await updateCarteraDigitalUsuario(id_usuario, monto);

        res.status(200).send('Cartera digital actualizada');
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
