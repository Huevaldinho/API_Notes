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
router.get("/notes", getNotes);
router.post("/notes", postNotes);
router.delete("/notes", deleteNotes);
router.put("/notes", putNotes);

export default router;
