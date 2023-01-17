const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME, //
  password: process.env.DB_PASSWORD, //
  database: process.env.DB_NAME  // created using provided data
});
connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Database connected');
})
module.exports = connection;