const { User } = require('../util/models')
const { isEmail } = require('validator')
const passwordValidator = require('password-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
   checkUsernameAvailability: async (req, res) => {
      let usernameTaken = await User.findAll({
         where: { username: req.params.username },
      })

      if (usernameTaken.length !== 0) {
         res.status(200).send('username taken')
      } else {
         res.status(200).send('username available')
      }
   },

   checkEmailAvailability: async (req, res) => {
      try {
         console.log(0)
         if (isEmail(req.params.email)) {
            console.log(1)
            let emailTaken = await User.findAll({
               where: { email: req.params.email },
            })
            if (emailTaken.length !== 0)
               res.status(200).send('email already in use')
            else res.status(200).send('email available')
         } else {
            res.status(200).send('not a valid email format')
         }
         console.log(2)
      } catch (err) {
         res.status(403).send(err)
      }
   },

   registerUser: async (req, res) => {
      const { email, password } = req.body

      const schema = new passwordValidator()
      schema
         .is()
         .min(8)
         .is()
         .max(100)
         .has()
         .uppercase()
         .has()
         .lowercase()
         .has()
         .digits()
         .has()
         .not()
         .spaces()
         .is()
         .not()
         .oneOf(['Passw0rd', 'Password123'])
      let validPassword = schema.validate(password)
      let messages = schema.validate(password, { list: true })

      try {
         if (isEmail(email)) console.log('email good')
         else return res.status(200).send('server says email is not valid')

         if (validPassword) console.log('password good')
         else return res.status(200).send(messages)

         const salt = bcrypt.genSaltSync(10)
         const hash = bcrypt.hashSync(password, salt)

         let findUser = await User.findOne({ where: { email: email } })
         console.log('............----------------............', findUser)
         if (findUser) return res.status(200).send('email already in use')

         let createUser = await User.create({
            email: email,
            username: '',
            hashedPass: hash,
            confirmedAccount: false,
            admin: false,
            oneTimePass: null,
         })
         console.log('-------------------------', createUser)

         res.status(200).send(createUser)
      } catch (err) {
         console.log(err)
         res.status(403).send(err)
      }
   },

   checkEmailValid: async (req, res) => {
      if (isEmail(req.body.email)) res.status(200).send('email valid')
      else res.status(200).send('email not valid')
   },

   checkLoginInfo: async (req, res) => {
      const { email, password } = req.body
      try {
         let user = await User.findOne({
            where: {
               email: email,
            },
         })
         let authenticated
         if (user) {
            authenticated = bcrypt.compareSync(password, user.hashedPass)
            delete user.dataValues.hashedPass
         } else return res.status(200).send('incorrect email or password')

         if (authenticated && user) {
            // User is authenticated
            const accessToken = await signAccessToken({ sub: user.id })

            return res.status(200).send({
               accessToken,
               user,
            })
         } else return res.status(200).send('incorrect email or password')
      } catch (err) {
         console.log('HERE I AM LOOK AT ME')
         console.log(err)
         res.status(403).send('dad?')
      }
   },

   findUser: async (req, res) => {
      try {
         // requireAuth
         const accessToken = req.headers.authorization
         const { sub } = await verifyAccessToken(accessToken)
         if (!sub) throw new Error('unauthorized')
         // --------------
         const user = await User.findOne({
            where: { id: sub },
         })
         delete user.dataValues.hashedPass
         return res.send(user)
      } catch (err) {
         return res.status(403).send('findUser function: unauthorized')
      }
   },

   updateUsername: async (req, res) => {
      const { id, username } = req.body
      try {
         if (username.length > 1) {
            await User.update({ username: username }, { where: { id } })

            const user = await User.findOne({ where: { id } })

            const accessToken = await signAccessToken({ sub: id })
            res.status(200).send({ accessToken, user })
         } else {
            res.status(200).send('Username must be at least 2 characters')
         }
      } catch (err) {
         console.log(err)
         res.status(403).send(err)
      }
   },

   changePassword: async (req, res) => {
      const { accessToken, currPass, newPass } = req.body
      try {
         const { sub } = await verifyAccessToken(accessToken)
         if (sub) {
            let user = await User.findOne({ where: { id: sub } })
            let pass1Good = bcrypt.compareSync(currPass, user.hashedPass)
            if (pass1Good) {
               const schema = new passwordValidator()
               schema
                  .is()
                  .min(8)
                  .is()
                  .max(100)
                  .has()
                  .uppercase()
                  .has()
                  .lowercase()
                  .has()
                  .digits()
                  .has()
                  .not()
                  .spaces()
                  .is()
                  .not()
                  .oneOf(['Passw0rd', 'Password123'])
               let validPassword = schema.validate(newPass)
               let messages = schema.validate(newPass, { list: true })

               if (validPassword) {
                  const salt = bcrypt.genSaltSync(10)
                  const hash = bcrypt.hashSync(newPass, salt)
                  await User.update(
                     { hashedPass: hash },
                     { where: { id: user.id } }
                  )
                  res.status(200).send('Password updated')
               } else return res.status(200).send(messages)
            } else return res.status(200).send('Current password incorrect')
         } else
            return res
               .status(200)
               .send('Account not authorized. Try logging in again')
      } catch (err) {
         console.log(err)
         res.status(403).send(err)
      }
   },
}

function signAccessToken(claims) {
   const JWT_SIGNING_SECRET = process.env.JWT_SIGNING_SECRET
   return new Promise((resolve, reject) => {
      jwt.sign(
         claims,
         JWT_SIGNING_SECRET,
         { algorithm: 'HS256' },
         (error, token) => {
            if (error) reject(error)
            else resolve(token)
         }
      )
   })
}

function verifyAccessToken(token) {
   const JWT_SIGNING_SECRET = process.env.JWT_SIGNING_SECRET
   return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SIGNING_SECRET, (error, data) => {
         if (error) reject(error)
         else resolve(data)
      })
   })
}
