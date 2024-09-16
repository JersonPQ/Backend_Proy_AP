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

export async function getUsuarioById(id) {
    const query = "SELECT id, nombre_completo, correo_electronico, area_trabajo,\
                    cartera_digital, telefono, contrasena, fecha_registro, rol, estado\
                    FROM Usuarios\
                    WHERE id = ?;"
    const [rows] = await pool.query(query, [id])
    return rows
}

// **************** Login ****************
export async function login(correo_electronico, contrasena) {
    const query = "SELECT id, correo_electronico\
                    FROM Usuarios\
                    WHERE correo_electronico = ? AND contrasena = ? AND estado = TRUE;"
    const [rows] = await pool.query(query, [correo_electronico, contrasena])
    return rows
}

// **************** Proyectos ****************
export async function getProyectosByUsuario(id_usuario) {
    const query = "SELECT P.id, P.id_usuario, P.nombre_proyecto, P.descripcion, P.objetivo_financiacion, P.monto_recaudado, P.fecha_limite,\
                    P.categoria_id, C.nombre_categoria, P.imagenes_videos, P.fecha_creacion\
                    FROM Proyectos P\
                        INNER JOIN Categorias C ON P.categoria_id = C.id\
                    WHERE P.id_usuario = ?;"
    const [rows] = await pool.query(query, [id_usuario])
    return rows
}

export async function getProyectos() {
    const query = "SELECT P.id, P.id_usuario, P.nombre_proyecto, P.descripcion, P.objetivo_financiacion, P.monto_recaudado, P.fecha_limite,\
                    P.categoria_id, C.nombre_categoria, P.imagenes_videos, P.fecha_creacion\
                    FROM Proyectos P\
                        INNER JOIN Categorias C ON P.categoria_id = C.id;"
    const [rows] = await pool.query(query)
    return rows
}

export async function getProyectoById(id) {
    const query = "SELECT P.id, P.id_usuario, U.nombre_completo \"nombre_usuario\", P.nombre_proyecto, P.descripcion, P.objetivo_financiacion, P.monto_recaudado, P.fecha_limite,\
                    P.categoria_id, C.nombre_categoria, P.imagenes_videos, P.fecha_creacion\
                    FROM Proyectos P\
                        INNER JOIN Categorias C ON P.categoria_id = C.id\
                        INNER JOIN Usuarios U ON P.id_usuario = U.id\
                    WHERE P.id = ?;"
    const [rows] = await pool.query(query, [id])
    return rows
}

// **************** Categorias ****************
export async function getCategorias() {
    const query = "SELECT id, nombre_categoria\
                    FROM Categorias;"
    const [rows] = await pool.query(query)
    return rows
}

// **************** Validación Fondos Suficientes ****************
export async function validarFondosSuficientesUsuario(id_usuario, monto) {
    const query = "SELECT cartera_digital\
                    FROM Usuarios\
                    WHERE id = ? AND cartera_digital >= ?;"
    const [rows] = await pool.query(query, [id_usuario, monto])
    return rows
}

// **************** Donaciones ****************
export async function getDonaciones() {
    const query = "SELECT D.id, D.id_usuario, U.nombre_completo \"nombre_usuario\", D.id_proyecto, P.nombre_proyecto, D.monto_donado, D.fecha_donacion\
                    FROM Donaciones D\
                        INNER JOIN Proyectos P ON D.id_proyecto = P.id\
                        INNER JOIN Usuarios U ON D.id_usuario = U.id;"
    const [rows] = await pool.query(query)
    return rows
}

// **************** Estadísticas ****************
export async function getEstadisticas() {
    const query = "SELECT COUNT(id) \"Cantidad_Proyectos\", (SELECT COUNT(id) FROM Donaciones) \"Cantidad_Donaciones\",\
                    (SELECT COUNT(id) FROM Usuarios WHERE estado = TRUE) \"Cantidad_Usuarios_Activos\"\
                    FROM Proyectos;"
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

// **************** Donaciones ****************
export async function insertDonacion(id_usuario, id_proyecto, monto_donado) {

    if (monto_donado == null) {
        throw new Error("El monto donado no puede ser nulo")
    }

    if (id_usuario == null) {
        throw new Error("El id del usuario no puede ser nulo")
    }

    if (id_proyecto == null) {
        throw new Error("El id del proyecto no puede ser nulo")
    }

    // inserta la donacion en la tabla Donaciones
    const query = "INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado)\
                    VALUES (?, ?, ?);"
    await pool.query(query, [id_usuario, id_proyecto, monto_donado])

    // actualiza monto recaudado del proyecto con el monto donado
    await updateMontoProyecto(id_proyecto, monto_donado)

    // actualiza cartera digital del usuario con el monto donado
    await updateCarteraDigitalUsuario(id_usuario, -monto_donado)
}

// ------------------------------- Actualizaciones -------------------------------

// **************** Proyectos ****************
export async function updateProyecto(id, nombre_proyecto, descripcion, objetivo_financiacion, fecha_limite, categoria_id) {
    if (nombre_proyecto == null) {
        throw new Error("El nombre del proyecto no puede ser nulo")
    }

    if (descripcion == null) {
        throw new Error("La descripcion del proyecto no puede ser nula")
    }

    if (objetivo_financiacion == null) {
        throw new Error("El objetivo de financiacion del proyecto no puede ser nulo")
    }

    if (fecha_limite == null) {
        throw new Error("La fecha limite del proyecto no puede ser nula")
    }

    if (categoria_id == null) {
        throw new Error("La categoria del proyecto no puede ser nula")
    }

    if (id == null) {
        throw new Error("El id del proyecto no puede ser nulo")
    }

    const query = "UPDATE Proyectos\
                    SET nombre_proyecto = ?, descripcion = ?, objetivo_financiacion = ?, fecha_limite = ?, categoria_id = ?\
                    WHERE id = ?;"
    await pool.query(query, [nombre_proyecto, descripcion, objetivo_financiacion, fecha_limite, categoria_id, id])
}

export async function updateMontoProyecto(id, monto_donado) {

    if (monto_donado == null) {
        throw new Error("El monto donado no puede ser nulo")
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

export async function updateNombreProyecto(id, nombre_proyecto) {
    if (nombre_proyecto == null) {
        throw new Error("El nombre del proyecto no puede ser nulo")
    }

    if (id == null) {
        throw new Error("El id del proyecto no puede ser nulo")
    }

    const query = "UPDATE Proyectos\
                    SET nombre_proyecto = ?\
                    WHERE id = ?;"
    await pool.query(query, [nombre_proyecto, id])
}

export async function updateDescripcionProyecto(id, descripcion) {
    if (descripcion == null) {
        throw new Error("La descripcion del proyecto no puede ser nula")
    }

    if (id == null) {
        throw new Error("El id del proyecto no puede ser nulo")
    }

    const query = "UPDATE Proyectos\
                    SET descripcion = ?\
                    WHERE id = ?;"
    await pool.query(query, [descripcion, id])
}

export async function updateObjetivoFinanciacionProyecto(id, objetivo_financiacion) {
    if (objetivo_financiacion == null) {
        throw new Error("El objetivo de financiacion del proyecto no puede ser nulo")
    }

    if (id == null) {
        throw new Error("El id del proyecto no puede ser nulo")
    }

    const query = "UPDATE Proyectos\
                    SET objetivo_financiacion = ?\
                    WHERE id = ?;"
    await pool.query(query, [objetivo_financiacion, id])
}

export async function updateFechaLimiteProyecto(id, fecha_limite) {
    if (fecha_limite == null) {
        throw new Error("La fecha limite del proyecto no puede ser nula")
    }

    if (id == null) {
        throw new Error("El id del proyecto no puede ser nulo")
    }

    const query = "UPDATE Proyectos\
                    SET fecha_limite = ?\
                    WHERE id = ?;"
    await pool.query(query, [fecha_limite, id])
}

export async function updateCategoriaProyecto(id, categoria_id) {
    if (categoria_id == null) {
        throw new Error("La categoria del proyecto no puede ser nula")
    }

    if (id == null) {
        throw new Error("El id del proyecto no puede ser nulo")
    }

    const query = "UPDATE Proyectos\
                    SET categoria_id = ?\
                    WHERE id = ?;"
    await pool.query(query, [categoria_id, id])
}

// **************** Usuarios ****************
export async function activarCuentaUsuario(id) {
    if (id == null) {
        throw new Error("El id del usuario no puede ser nulo")
    }

    const query = "UPDATE Usuarios\
                    SET estado = TRUE\
                    WHERE id = ?;"
    await pool.query(query, [id])
}

export async function desactivarCuentaUsuario(id) {
    if (id == null) {
        throw new Error("El id del usuario no puede ser nulo")
    }

    const query = "UPDATE Usuarios\
                    SET estado = FALSE\
                    WHERE id = ?;"
    await pool.query(query, [id])
}

export async function updateCarteraDigitalUsuario(id, monto) {
    if (monto == null) {
        throw new Error("El monto no puede ser nulo")
    }

    if (id == null) {
        throw new Error("El id del usuario no puede ser nulo")
    }

    const query = "UPDATE Usuarios\
                    SET cartera_digital = cartera_digital + ?\
                    WHERE id = ?;"
    await pool.query(query, [monto, id])
}
