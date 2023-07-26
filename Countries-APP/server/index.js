const server = require("./src/server");
const { conn } = require('./src/db.js');
const loadApi = require("./src/seeder/loadApi");
require('dotenv').config();
const { PORT } = process.env;

conn.sync({ force: true }).then(() => {
server.listen(PORT, () => {
  loadApi();
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
