require('dotenv').config()
const { Fortune } = require('../util/models')

module.exports = {
   getFortunes: async (req, res) => {
      try {
         console.log('TRY STATEMENT STARTED -------------')
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
         let fortunes = await Fortune.findAll()
         res.send(fortunes)
      } catch (err) {
         res.status(501).send(err)
         console.log('ERROR-------------', err)
      }
   },


   addFortune: async (req, res) => {
      console.log('createFortune controller function called')
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
}
