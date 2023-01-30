import express from "express";
var router = express.Router();
//Middlewheres de las rutas de las notas
import {
  getNotes,
  postNotes,
  putNotes,
  deleteNotes,
} from "../controllers/notes.controller";

// Rutas de las notas
router.get("/notes/:idUserOwner", getNotes);
router.post("/notes/:idUserOwner/:nota", postNotes);
router.delete("/notes/:idNota", deleteNotes);
router.put("/notes/:id/:newNote", putNotes);

export default router;
