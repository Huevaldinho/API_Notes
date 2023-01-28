var config = require("./dbConfig");
const sql = require("mssql");

async function getdata() {
  try {
    let pool = await sql.connect(config);
    console.log("sql server connected...");
    return pool.request().query("SELECT 1");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getdata: getdata,
};
