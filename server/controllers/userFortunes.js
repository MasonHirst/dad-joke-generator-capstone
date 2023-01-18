require('dotenv').config()
const { Fortune, User } = require('../util/models')
const jwt = require('jsonwebtoken')


module.exports = {
   getFortunes: async (req, res) => {
      try {
         let fortunes = await Fortune.findAll({
            where: { userAdded: false },
         })
         res.send(fortunes)
      } catch (err) {
         res.status(501).send(err)
         console.log('ERROR-------------', err)
      }
   },

   getAllFortunes: async (req, res) => {
      try {
         let fortunes = await Fortune.findAll({
            include: [{ model: User, attributes: ['username'] }],
         })
         res.send(fortunes)
      } catch (err) {
         res.status(501).send(err)
         console.log('ERROR-------------', err)
      }
   },

   addFortune: async (req, res) => {
      try {
         const { text, userAdded, userId } = req.body
         await Fortune.create({
            text,
            userAdded,
            userId,
         })
         res.status(200).send('Added fortune succesfully')
      } catch (err) {
         res.status(501).send(err)
         console.log('ERROR-------------', err)
      }
   },

   changeUsername: async (req, res) => {
      const { token, username } = req.body
      try {
         const { sub } = await verifyAccessToken(token)
         if (sub) {
            await User.update({username}, {where: {id: sub}})
            res.status(200).send('username updated successfully')
         } else return res.status(200).send('not authenticated')

      } catch (err) {
         console.log(err)
         res.status(403).send(err)
      }
   }
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