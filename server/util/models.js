const db = require('./database')
const { DataTypes } = require('sequelize')

const User = db.define('user', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
   },
   email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
   },
   username: {
      type: DataTypes.STRING({ length: 35 }),
      allowNull: false,
   },
   hashedPass: {
      type: DataTypes.STRING({ length: 500 }),
      allowNull: false,
   },
   confirmedAccount: DataTypes.BOOLEAN,
   admin: DataTypes.BOOLEAN,
   oneTimePass: DataTypes.STRING({ length: 500 })
})

const Fortune = db.define('fortune', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
   },
   text: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   userAdded: DataTypes.BOOLEAN
})

const Favorite = db.define('favorite', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
   },
})

module.exports = { User, Fortune, Favorite }
