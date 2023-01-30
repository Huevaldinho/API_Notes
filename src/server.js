import express from "express";
import {config} from 'dotenv'
config();//Para el .env
const app = express();
import notesRoutes from "./routes/notes.routes";

//Settings
app.set("port", process.env.SERVER_PORT || 3000);
//Routes
app.use(notesRoutes);


app.listen(app.get("port"), () => {
  console.log(`Server running on port ${app.get("port")}`);
});
