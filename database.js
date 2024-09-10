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

// **************** Proyectos ****************
export async function consultarProyectos() {
    const query = "SELECT P.id, P.nombreProyecto, P.recursosNecesarios, P.presupuesto, P.descripcion, \
                    P.idEstadoProyecto, E.nombreEstado, P.fechaInicio, P.fechaFin, P.idPersonaResponsable, C.nombre, C.primerApellido, C.segundoApellido \
                    FROM proyectos P inner join estadosProyectos E on P.idEstadoProyecto = E.id \
                    inner join colaboradores C on P.idPersonaResponsable = C.id;"
    const [rows] = await pool.query(query)
    return rows
}
