require('dotenv').config()
const { Fortune, User, Favorite } = require('../util/models')
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
            text: sequelize.escape(text),
            userAdded: sequelize.escape(userAdded),
            userId: sequelize.escape(userId),
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
            await User.update({ username }, { where: { id: sequelize.escape(sub) } })
            res.status(200).send('username updated successfully')
         } else return res.status(200).send('not authenticated')
      } catch (err) {
         console.log(err)
         res.status(403).send(err)
      }
   },

   toggleFavorite: async (req, res) => {
      const { userId, fortuneId } = req.body
      try {
         let found = await Favorite.findOne({ where: { userId: sequelize.escape(userId), fortuneId: sequelize.escape(fortuneId) } })
         console.log(found)
         if (found) {
            let dest = await Favorite.destroy({ where: { userId: sequelize.escape(userId), fortuneId: sequelize.escape(fortuneId) } })
            console.log(dest)
            return res.status(200).send('favorite removed')
         } else {
            let created = await Favorite.create({ userId: sequelize.escape(userId), fortuneId: sequelize.escape(fortuneId) })
            console.log('CREATED', created)
            return res.status(200).send('favorite created')
         }
      } catch (err) {
         console.log(err)
         res.status(404).send(err)
      }
   },

   determineFav: async (req, res) => {
      const { userId, fortuneId } = req.body
      try {
         let found = await Favorite.findOne({ where: { userId: sequelize.escape(userId), fortuneId: sequelize.escape(fortuneId) } })
         if (found) return res.status(200).send(true)
         else return res.status(200).send(false)
      } catch (err) {
         console.log(err)
         return res.status(403).send(err)
      }
   },

   getAllFortunesFav: async (req, res) => {
      try {
         let favs = await Favorite.findAll()
         console.log(favs)
         res.status(200).send(favs)
      } catch (err) {
         console.log(err)
         return res.status(403).send(err)
      }
   },

   getUserFavs: async (req, res) => {
      const { id } = req.body
      try {
         let favs = await Favorite.findAll({
            where: { userId: sequelize.escape(id) },
            include: [{model: Fortune, include: [{model: User}]}]
         })
         res.status(200).send(favs)
      } catch (err) {
         console.log(err)
         return res.status(403).send(err)
      }
   }, 

   deleteFav: async (req, res) => {
      const { id } = req.params
      console.log('id', id)
      try {
         let deleted = await Favorite.destroy({where: { id: sequelize.escape(id) }})
         console.log(deleted)
         
      } catch (err) {
         console.log(err)
         return res.status(403).send(err)
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
