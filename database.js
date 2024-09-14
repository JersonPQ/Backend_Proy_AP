import mysql from "mysql2"
import {MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT} from "./config.js"


const pool = mysql.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    port: MYSQL_PORT
}).promise()

// ---------------------------------- Consultas ----------------------------------

// **************** RolUsuarios ****************
export async function getRolUsuarios() {
    const query = "SELECT id, nombre_rol\
                    FROM RolUsuarios;"
    const [rows] = await pool.query(query)
    return rows
}

// **************** Usuarios ****************
export async function getUsuarios() {
    const query = "SELECT id, nombre_completo, correo_electronico, area_trabajo,\
                    cartera_digital, telefono, contrasena, fecha_registro, rol, estado\
                    FROM Usuarios;"
    const [rows] = await pool.query(query)
    return rows
}

// **************** Login ****************
export async function login(correo_electronico, contrasena) {
    const query = "SELECT id, correo_electronico\
                    FROM Usuarios\
                    WHERE correo_electronico = ? AND contrasena = ?;"
    const [rows] = await pool.query(query, [correo_electronico, contrasena])
    return rows
}

// **************** Proyectos ****************
export async function getProyectosByUsuario(id_usuario) {
    const query = "SELECT P.id, P.id_usuario, P.nombre_proyecto, P.descripcion, P.objetivo_financiacion, P.monto_recaudado, P.fecha_limite,\
                    C.nombre_categoria, P.imagenes_videos, P.fecha_creacion\
                    FROM Proyectos P\
                        INNER JOIN Categorias C ON P.categoria_id = C.id\
                    WHERE P.id_usuario = ?;"
    const [rows] = await pool.query(query, [id_usuario])
    return rows
}

export async function getProyectos() {
    const query = "SELECT P.id, P.id_usuario, P.nombre_proyecto, P.descripcion, P.objetivo_financiacion, P.monto_recaudado, P.fecha_limite,\
                    C.nombre_categoria, P.imagenes_videos, P.fecha_creacion\
                    FROM Proyectos P\
                        INNER JOIN Categorias C ON P.categoria_id = C.id;"
    const [rows] = await pool.query(query)
    return rows
}

// **************** Categorias ****************
export async function getCategorias() {
    const query = "SELECT id, nombre_categoria\
                    FROM Categorias;"
    const [rows] = await pool.query(query)
    return rows
}

// ------------------------------- Inserciones -------------------------------

// **************** Usuarios ****************
export async function insertUsuario(nombre_completo, cedula, correo_electronico, area_trabajo, cartera_digital, telefono, contrasena, rol) {
    const query = "INSERT INTO Usuarios (nombre_completo, cedula, correo_electronico, area_trabajo, cartera_digital, telefono, contrasena, rol)\
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?);"
    await pool.query(query, [nombre_completo, cedula, correo_electronico, area_trabajo, cartera_digital, telefono, contrasena, rol])
}

// **************** Proyectos ****************
export async function insertProyecto(id_usuario, nombre_proyecto, descripcion, objetivo_financiacion, fecha_limite, categoria_id, imagen = null) {
    const query = "INSERT INTO Proyectos (id_usuario, nombre_proyecto, descripcion, objetivo_financiacion, fecha_limite, categoria_id, imagenes_videos)\
                    VALUES (?, ?, ?, ?, ?, ?, ?);"
    await pool.query(query, [id_usuario, nombre_proyecto, descripcion, objetivo_financiacion, fecha_limite, categoria_id, imagen])
}

// ------------------------------- Actualizaciones -------------------------------

// **************** Proyectos ****************
export async function updateMontoProyecto(id, monto_donado) {

    if (monto_donado <= 0) {
        throw new Error("El monto donado debe ser mayor a 0")
    } 

    if (id == null) {
        throw new Error("El id del proyecto no puede ser nulo")
    }
    // actualiza monto recaudado del proyecto con el monto donado, realiza suma del monto ya existente con el monto donado
    const query = "UPDATE Proyectos\
                    SET monto_recaudado = monto_recaudado + ?\
                    WHERE id = ?;"
    await pool.query(query, [monto_donado, id])
}

