const bcrypt = require('bcrypt')

let password = 'jackiscool'

function hash(pass) {
   const salt = bcrypt.genSaltSync(10)
   const hash = bcrypt.hashSync(pass, salt)
   return hash
}

console.log(hash(password))