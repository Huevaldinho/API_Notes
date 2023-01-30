import { getConnection } from "../database/connection.js";

//Middlewheres de las rutas de las notas.
export const getNotes = (req, res) => {
  try {
    getConnection().request()
    res.json("Get Notes");
  } catch (error) {}
};
export const postNotes = (req, res) => {
  res.send("Post notes");
};
export const deleteNotes = (req, res) => {
  res.send("Delete notes");
};
export const putNotes = (req, res) => {
  res.send("Put notes");
};
