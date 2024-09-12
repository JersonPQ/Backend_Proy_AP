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
                    FROM RolUsuarios"
    const [rows] = await pool.query(query)
    return rows
}
