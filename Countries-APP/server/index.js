const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const loadApi = require("./src/seeder/loadApi");
const PORT = 3001;

conn.sync({ force: false }).then(() => {
server.listen(PORT, () => {
  loadApi();
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
