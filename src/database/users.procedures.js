import { getConnection } from "./connection";

/*
    Funcion encargada de ejecutar el procedimiento almacenado
    que crea usuarios.
    Params:
    *   email string (250 caracteres): Correo del usuario a crear.
    *   password string(hasheada 16 caracteres): Contraseña del usuario a crear.
    Retorna:
    * [{  "idUserCreated": value}]: Si logra crear a el usuario.
    * [{   "emailRepeated": -1}]: Si el correo ya se encuentra registrado.
    * [{"":null}]: Si email o password es null.
    * null: Si no logra hacar la conexion o ejecutar el procedimiento.
*/
export async function postUserProcedure(email, password) {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("email", email)
      .input("password", password)
      .execute(`sp_create_user`);
    return result.recordset;
  } catch (error) {
    console.log("Error al crear usuario:", email);
    return null;
  }
}
