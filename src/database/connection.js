import sql from "mssql";
import { config } from "dotenv";
config(); //Para el .env

var dbConfig = {
  //Configuracion de conexion con ms sql server
  server: process.env.DB_SERVER, //update me
  authentication: {
    type: "default",
    options: {
      userName: process.env.DB_USER, //update me
      password: process.env.DB_PWD, //update me
    },
  },
  options: {
    // If you are on Microsoft Azure, you need encryption:
    encrypt: true,
    database: process.env.DB_NAME, //update me
    port: Number(process.env.DB_PORT), // Default Port
    trustServerCertificate: true,
  },
};

/**
 * Funcion para obtener una conexion con sql server.
 * Parametros: No tiene.
 * Retorna:
 *  * conxion: Si logra establecer la conexion con la configuracion espeficicada.
 *  * null: Si no logra establecer la conexion.
 */
export async function getConnection() {
  try {
    const pool = await sql.connect(dbConfig); //Se conecta a la base de datos con la config
    return pool;
  } catch (error) {
    console.log("Error al conectarse a la base de datos.", error);
    return null;
  }
}
