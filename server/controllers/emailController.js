const SibApiV3Sdk = require('sib-api-v3-sdk')
require('dotenv').config()
const bcrypt = require('bcrypt')
const { User, Favorite, Fortune } = require('../util/models')
const { SEND_IN_BLUE_FIRST_API_KEY } = process.env

module.exports = {
   accountConfirmEmail: async (req, res) => {
      console.log('YOU MADE IT TO THE SEND EMAIL')
      const { id, email, username } = req.body
      try {
         let oneTimePass = Math.floor(Math.random() * 1000000)
         const salt = bcrypt.genSaltSync(10)
         const hash = bcrypt.hashSync(oneTimePass.toString(), salt)

         await User.update({ oneTimePass: hash }, { where: { id } })

         SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey =
            SEND_IN_BLUE_FIRST_API_KEY

         new SibApiV3Sdk.TransactionalEmailsApi()
            .sendTransacEmail({
               subject: 'Welcome to Dad Joke Generator!',
               sender: {
                  email: 'authentication@DadJokeGenerator.com',
                  name: 'Dad Joke Generator',
               },
               replyTo: {
                  email: 'authentication@DadJokeGenerator.com',
                  name: 'Dad Joke Generator',
               },
               to: [{ name: username, email: email }],
               htmlContent: `<html><body><h1>Welcome to Dad Joke Generator, ${username}! <br><h3>{{params.bodyMessage}}<h1>${oneTimePass}</h1></h3></h1></body></html>`,
               params: { bodyMessage: `Your one time password: ` },
            })
            .then(
               function (data) {
                  console.log(data)
               },
               function (error) {
                  console.error(error)
               }
               )
         return res.status(200).send('email sent!')
      } catch (err) {
         console.log(err)
         res.status(403).send(err)
      }
   },

   compareOneTimePass: async (req, res) => {
      const { id, pass } = req.body
      try {
         let user = await User.findOne({ where: { id } })
         authenticated = bcrypt.compareSync(pass, user.oneTimePass)
         console.log('one time password authenticated: ', authenticated)
         if (authenticated) {
            let removed = await User.update(
               { oneTimePass: null },
               { where: { id } }
            )
            await User.update({ confirmedAccount: true }, { where: { id } })
            return res.status(200).send(removed)
         } else return res.status(200).send('code incorrect')
      } catch (err) {
         console.log(err)
         res.status(405).send(err)
      }
   },

   sendTempPassword: async (req, res) => {
      const { email } = req.params
      try {
         let foundUser = await User.findOne({where: { email }})
         if (!foundUser) return res.status(200).send('no account with that email')
         
         let tempPass = Math.floor(Math.random() * 1000000)
         const salt = bcrypt.genSaltSync(10)
         const hash = bcrypt.hashSync(tempPass.toString(), salt)

         let updated = await User.update(
            { hashedPass: hash },
            { where: { email: email } }
         )
         console.log(updated)

         SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey =
            SEND_IN_BLUE_FIRST_API_KEY

         new SibApiV3Sdk.TransactionalEmailsApi()
            .sendTransacEmail({
               subject: 'Temporary login password',
               sender: {
                  email: 'authentication@Dad Joke Generator.com',
                  name: 'Dad Joke Generator',
               },
               replyTo: {
                  email: 'authentication@DadJokeGenerator.com',
                  name: 'Dad Joke Generator',
               },
               to: [{ name: 'User', email: email }],
               htmlContent: `<html><body><h1>You here is your temporary password. Be sure to update your password via account settings after loggin in.<br><h3>{{params.bodyMessage}}<h1>${tempPass}</h1></h3></h1></body></html>`,
               params: { bodyMessage: `Your temporary password: ` },
            })
            .then(
               function (data) {
                  console.log(data)
               },
               function (error) {
                  console.error(error)
               }
            )
            return res.status(200).send(updated)
      } catch (err) {
         console.log(err)
         res.status(403).send(err)
      }
   },
}

// SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey =
//    SEND_IN_BLUE_FIRST_API_KEY

// console.log('-----------------------------------------------------------------')

// new SibApiV3Sdk.TransactionalEmailsApi()
//    .sendTransacEmail({
//       subject: 'Hello from the Node SDK!',
//       sender: { email: 'authentication@LiveCode.com', name: 'LiveCode' },
//       replyTo: { email: 'authentication@LiveCode.com', name: 'LiveCode' },
//       to: [{ name: 'Mason Hirst', email: 'mhirstdev@gmail.com' }],
//       htmlContent:
//          '<html><body><h1>This is a transactional email {{params.bodyMessage}}</h1></body></html>',
//       params: { bodyMessage: 'Made just for you!' },
//    })
//    .then(
//       function (data) {
//          console.log(data)
//       },
//       function (error) {
//          console.error(error)
//       }
//    )
