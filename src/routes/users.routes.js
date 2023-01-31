import express from "express";
var router = express.Router();
//Middlewheres de las rutas de los users
import {
  getUser,
  deleteUser,
  postUser,
  putUser,
} from "../controllers/users.controller";

// Rutas de los users
router.get("/users/:idUser", getUser);
router.post("/users/:email/:password", postUser);
router.delete("/users/:idUser", deleteUser);
router.put("/users/:idUser/:email/:password", putUser);

export default router;
