import { getConnection } from "./connection";

/*
    Funcion que ejecuta el procedimiento almacenado encargado de
    crear una nueva nota.
    Params:
    *   nota string: Nota que se desea crear.
    *   idUserOwner int: Id del usuario que requiere crear la nota.
    Retorna:
    *   [{"idNoteCreated": value}]: Si logra crear la nueva nota.
    *   [{"userNotFound": -1}]: Si no existe usuario con el id ingresado.
    *   null: Si no logra hacer la conexion o ejecucion del procedimiento
*/
export async function createNotesProcedure(idUserOwner, nota) {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("userOwner", idUserOwner)
      .input("note", nota)
      .execute(`sp_create_note`);
    return result.recordset;
  } catch (error) {
    console.log("Error al crear nota del usuario:", idUserOwner, nota);
    return null;
  }
}

/*
    Funcion que ejecuta el procedimiento almacenado encargado de
    obtener todas las notas de un usuario.
    Params:
    *   idUserOwner int: Id del usuario que requiere consultar sus notas.
    Retorna:
    *    [{idNote:value,note:value,idOwner:value,emailOwner:value},...]: Si logra consultar las notas del usuario.
    *   [{"userNotFound": -1}]: Si no existe usuario con el id ingresado.
    *   null: Si no logra hacer la conexion o ejecucion del procedimiento
*/
export async function getNotesProcedure(idUserOwner) {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("userOwner", idUserOwner)
      .execute(`sp_read_notes`);
    return result.recordset;
  } catch (error) {
    console.log("Error al consultar las notas del usuario:", idUserOwner);
    return null;
  }
}
/*
    Funcion que ejecuta el procedimiento almacenado encargado de
    eliminar una nota de un usuario.
    Params:
    *   idNota int: Id de la nota a eliminar.
    Retorna:
    *   [{"idNoteDeleted": 1}]: Si logra eliminar la nota con el id ingresado.
    *   [{"noteNotFound": -1}]: Si no existe nota con el id ingresado.
    *   null:  Si no logro hacer la conexion o ejecucion del procedimiento
*/
export async function deleteNoteProcedure(idNota) {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", idNota)
      .execute(`sp_delete_note`);
    return result.recordset;
  } catch (error) {
    console.log("Error eliminar la nota:", idNota);
    return null;
  }
}
/*
    Funcion que ejecuta el procedimiento almacenado encargado de
    actualizar una nota.
    Params:
    *   nuevaNota string: Nueva nota a actualizar.
    *   idNota int: Id de la nota a actualizar.
    Retorna:
    *   [{"idNoteUpdated": value}]: Si logra actualizar la nota.
    *   [{"noteNotFound": -1}]: Si no existe ninguna nota con el id ingresado.
    *   [{"": null}]: Si algun parametro es null.
    *   null: Si no logra hacer la conexion o ejecucion del procedimiento
*/
export async function putNoteProcedure(idNota, nuevaNota) {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", idNota)
      .input("newNote", nuevaNota)
      .execute(`sp_update_note`);
    return result.recordset;
  } catch (error) {
    console.log("Error al actualizar nota:", idNota, nuevaNota);
    return null;
  }
}
