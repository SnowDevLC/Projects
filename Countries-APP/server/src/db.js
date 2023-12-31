require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require('fs');
const path = require('path');
const { DB_DEPLOY } = process.env;

const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false, 
  native: false,
  ssl: true, 
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Se leen los archivos del directorio /models y se agregan al array de modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Se desestructuran los modelos para acceder directamente a ellos
const { Country, Activity } = sequelize.models;

// Aca vendrian las relaciones
// Country pertenece a muchos Activity
Country.belongsToMany(Activity, { through: 'country_activity', timestamps: false, tableName: 'countries' });
// Activity pertenece a muchos Country
Activity.belongsToMany(Country, { through: 'country_activity', timestamps: false, tableName: "activities" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};