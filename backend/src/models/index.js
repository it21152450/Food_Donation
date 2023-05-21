const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize")
const { fileURLToPath } = require("url");

const basename = path.basename(__filename);

const db = {};

const db_connection_url = "postgresql://postgres:Methilan12@@db.btwuxuatdmxfuccyhlmc.supabase.co:5432/postgres"

const sequelize = new Sequelize(db_connection_url, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // <<<<<<< YOU NEED THIS
        }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
})


fs
    .readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;