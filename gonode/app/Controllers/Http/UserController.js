'use strict'
const Database = use('Database')

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])
    const addresses = request.input('addresses')

    const trx = await Database.beginTransaction() // transaction para barrar erros

    const user = await User.create(data, trx) // passa no segundo parametro pra captar erro
    await user.addresses().createMany(addresses, trx) // fica assim pois é uma funcion de callback

    await trx.commit()

    return user
  }
}

module.exports = UserController
