// Requiring modules
const express = require("express");
const app = express();
const port = 3000;
const sql = require("mssql");
//Db
//const sql = require("./dbOperation");

app.get("/", async (req, res) => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(
      "Server=localhost,1433;Database=API_Notes;User Id=api_notes_user;Password=password;Encrypt=true"
    );
    const result = await sql.query`select * from Notes`;
    res.send(result);
  } catch (err) {
    // ... error checks
    console.log(err);
    res.send('Error')
  }
});

async function prueba() {}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
