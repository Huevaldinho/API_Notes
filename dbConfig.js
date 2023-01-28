//Usar .env
const config = {
  user: "api_notes_user",
  password: "password",
  database: "API_Notes",
  server: "localhost",
  options: {
    "trustedconnection": true,
    "enableArithAbort": true,
    "encrypt":false
  },
  trustServerCertificate: true,
};

module.exports = config;
