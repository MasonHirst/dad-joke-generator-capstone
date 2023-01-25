const Sequelize = require('sequelize')
require('dotenv').config()
const DB_CONNECTION_STR = process.env.DATABASE_CONNECTION_STRING || 'postgresql://MasonHirst:v2_3xjCL_Rg6EaE5fFKevw6knzDFZ5x5@db.bit.io/MasonHirst/LiveCode-specs-capstone'

const db = new Sequelize(
   DATABASE_CONNECTION_STRING,
   {
      dialect: "postgres",
      dialectOptions: {
         ssl: {
            require: true,
            rejectUnauthorized: false,
         }
      }
   }
)

module.exports = db