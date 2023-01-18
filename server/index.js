//! Imports go at the top
const express = require('express')
const server = express()
const cors = require('cors')
require('dotenv').config()


const db = require('./util/database')
const seed = require('./util/seed')
const { User, Fortune, Favorite} = require('./util/models')

//! Middleware
server.use(express.json())
server.use(cors())

//! Relationships
User.hasMany(Favorite)
Favorite.belongsTo(User)
User.hasMany(Fortune)
Fortune.belongsTo(User)
Fortune.hasMany(Favorite)
Favorite.belongsTo(Fortune)


//! Endpoints
const { getFortunes, getAllFortunes, addFortune, changeUsername } = require('./controllers/userFortunes')
const { checkUsernameAvailability, checkEmailAvailability, registerUser, checkEmailValid, checkLoginInfo, findUser, updateUsername } = require('./controllers/authController')

server.get('/accounts/validate/username/:username', checkUsernameAvailability)
server.get('/accounts/validate/email/:email', checkEmailAvailability)
server.post('/accounts/users/create', registerUser)
server.post('/accounts/find/email', checkEmailValid)
server.post('/accounts/validate/login', checkLoginInfo)
server.get('/accounts/users', findUser)
server.post('/accounts/users/update/username', updateUsername)

server.get('/random/fortunes', getFortunes)
server.get('/fortunes/all', getAllFortunes)
server.post('/fortunes/add', addFortune)
server.put('/accounts/users/change/username', changeUsername)


//! Listen Statement
const { SERVER_PORT } = process.env

db.
   sync()
   // sync({force: true})
   // .then(() => seed())
   .then(() => {
      server.listen(SERVER_PORT, () => console.log(`SERVER RUNNING ON SERVER_PORT ${SERVER_PORT}`))
   })
   .catch(err => console.log(err))