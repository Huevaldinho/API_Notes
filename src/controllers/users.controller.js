import { postUserProcedure } from "../database/users.procedures";
/*
    !TODO
*/
export const getUser = async (req, res) => {
  console.log("Get user middlewhere");
  try {
    res.send("Get user middlewhere no tiene logica.");
  } catch (error) {
    res.status(500).json(error);
  }
};
/*
    Middlewhere encargado de manejar el 
    post request para crear un nuevo 
    usuario.
    Params:
    *   email string: Email del nuevo usuario.
    *   password string (hasheada): Contraseña del usuario.
    Retorna:
    *    [{  "idUserCreated": value}]: Si logra crear a el usuario.
    *    [{   "emailRepeated": -1}]: Si el correo ya se encuentra registrado.
*/
export const postUser = async (req, res) => {
  console.log("Post user middlewhere");
  try {
    let email = req.params.email;
    let password = req.params.password;
    await console.log(req.params);
    await res.status(200).json(await postUserProcedure(email, password));
  } catch (error) {
    res.status(500).json(error);
  }
};
/*
    !TODO
*/
export const deleteUser = async (req, res) => {
  console.log("Delete user middlewhere");
  try {
    await res.send("Delete user middlewhere no tiene logica.");
  } catch (error) {
    res.status(500).json(error);
  }
};
/*
    !TODO
*/
export const putUser = async (req, res) => {
  console.log("Put user middlewhere");
  try {
    let idUser = req.params.idUser;
    let email = req.params.email;
    let password = req.params.password;
    await res.send("Put user middlewhere no tiene logica.");
  } catch (error) {
    res.status(500).json(error);
  }
};
