//! Imports go at the top
const express = require('express')
const server = express()
const cors = require('cors')
require('dotenv').config()
const path = require('path')

const db = require('./util/database')
const seed = require('./util/seed')
const { User, Fortune, Favorite } = require('./util/models')

//! Middleware
const join = path.join(__dirname, '..', 'build')
console.log(join)
server.use(express.static(join))
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
const {
   getFortunes,
   getAllFortunes,
   addFortune,
   changeUsername,
   toggleFavorite,
   determineFav,
   getAllFortunesFav,
   getUserFavs,
   deleteFav,
} = require('./controllers/userFortunes')
const {
   checkUsernameAvailability,
   checkEmailAvailability,
   registerUser,
   checkEmailValid,
   checkLoginInfo,
   findUser,
   updateUsername,
   changePassword,
} = require('./controllers/authController')
const {
   accountConfirmEmail,
   compareOneTimePass,
   sendTempPassword,
} = require('./controllers/emailController')

server.get('/accounts/validate/username/:username', checkUsernameAvailability)
server.get('/accounts/validate/email/:email', checkEmailAvailability)
server.post('/accounts/users/create', registerUser)
server.post('/accounts/find/email', checkEmailValid)
server.post('/accounts/validate/login', checkLoginInfo)
server.get('/accounts/users', findUser)
server.post('/accounts/users/update/username', updateUsername)
server.put('/accounts/users/update/password', changePassword)

server.post('/accounts/user/email/send_confirm_email', accountConfirmEmail)
server.post('/accounts/user/email/confirm_one_time_pass', compareOneTimePass)
server.get('/accounts/user/forgot_password/:email', sendTempPassword)

server.get('/random/fortunes', getFortunes)
server.get('/fortunes/all', getAllFortunes)
server.get('/fortunes/all/favorites', getAllFortunesFav)
server.post('/fortunes/add', addFortune)
server.put('/accounts/users/change/username', changeUsername)
server.put('/user/favorites/add', toggleFavorite)
server.post('/fortunes/favorites/determine', determineFav)
server.post('/fortunes/get/user/favorites', getUserFavs)
server.delete('/user/favorites/delete/:id', deleteFav)

server.get('*', (req, res) => {
   res.sendFile(
      path.resolve(__dirname, '..', 'build', 'index.html')
   )
})

//! Listen Statement
const { SERVER_PORT } = process.env

db.sync()
   // sync({force: true})
   // .then(() => seed())
   .then(() => {
      server.listen(SERVER_PORT || 8080, () =>
         console.log(`SERVER RUNNING ON SERVER_PORT ${SERVER_PORT || 8080}`)
      )
   })
   .catch((err) => console.log(err))
