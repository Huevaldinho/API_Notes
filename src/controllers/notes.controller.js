import {
  getNotesProcedure,
  deleteNoteProcedure,
  createNotesProcedure,
  putNoteProcedure
} from "../database/procedimientos";

//Middlewheres de las rutas de las notas.

//Un parametro tiene : antes de su nombre
// ejemplo /notas/:id -> id es un parametro y se accede: req.params.id

/*
  Middlewhere para manejar el get request de las notas.
  Params:
    * idUserOwner int: Id del usuario que requiere consultar sus notas.
  Retorna:
  *   [{idNote:value,note:value,idOwner:value,emailOwner:value},...]
  *   []: Si el usuario no tiene notas.
  *   [{"userNotFound": -1}]: Si no existe usuario con el id ingresado.
*/
export const getNotes = async (req, res) => {
  console.log("Get notes middlewhere");
  try {
    await res.status(200).json(await getNotesProcedure(req.params.idUserOwner));
  } catch (error) {
    res.status(500).json(error);
  }
};

/*
  Middlewhere para manejar el post request de las notas.
  Params:
  *   idUserOwner int: Id del usuario que requiere crear la nota.
  *   nota string: Nota que requiere crear el usuario.
  Retorna:  
  *   [{"idNoteCreated": value}]: Si logra crear la nueva nota.
  *   [{"userNotFound": -1}]: Si no existe usuario con el id ingresado.
 */
export const postNotes = async (req, res) => {
  console.log("Create notas middlewhere");
  try {
    await res
      .status(200)
      .json(
        await createNotesProcedure(req.params.idUserOwner, req.params.nota)
      );
  } catch (error) {
    res.status(500).json(error);
  }
};

/*
    Middlewhere para manejar el delete request de una nota.
    Params:
    *   idNota int: Id de la nota a eliminar.
    Retorna:
    *   [{"idNoteDeleted": value}]: Si logro eliminar la nota.
    *   [{"noteNotFound": -1 }]: Si no existe nota con el id ingresado.

*/
export const deleteNotes = async (req, res) => {
  console.log("Delete note middlewhere");
  try {
    await res.status(200).send(await deleteNoteProcedure(req.params.idNota));
  } catch (error) {
    res.status(500).json(error);
  }
};
export const putNotes =async (req, res) => {
  console.log("Put notas middlewhere");
  try {
    await res
      .status(200)
      .json(
        await putNoteProcedure(req.params.id, req.params.newNote)
      );
  } catch (error) {
    res.status(500).json(error);
  }
};
