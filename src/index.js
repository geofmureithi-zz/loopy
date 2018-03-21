const vorpal = require('vorpal')()
require('dotenv').config()
const login = require('./endpoints/login')
const checkBalance = require('./endpoints/check-balance')
const sendToMobile = require('./endpoints/send-to-mobile')
let authCode = null
let user = {}

vorpal
  .command('login', 'Logins to Servers and gets Access Token')
  .action(function (args, next) {
    const promise = this.prompt([
      {
        type: 'input',
        name: 'email',
        message: 'Email: '
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password: '
      }
    ])

    promise.then(async (creds) => {
      const { email, password } = creds
      try {
        const resp = await login(email, password)
        if(resp.data.returnCode === 3509) throw new Error(resp.data.returnMessage)
        authCode = resp.headers['auth-token']
        user = resp.data
        this.log(`Welcome ${user.firstName}, you are now logged in to loopy`)
        this.log(`To get started please type help to get a list of available commands`)
      } catch (e) {
        this.log(`Login Failed. Reason: ${e.message}`)
      }
      next()
    })
  })
vorpal
  .command('check-balance', 'Checks Account balance for the logged in user')
  .action(async function (args, next) {
    try {
      const resp = await checkBalance(user, authCode)
      this.log(`Dear ${user.firstName}, your account balance is Ksh ${resp.data.balance}`)
    } catch (e) {
      this.log(`Check balance Failed. Reason: ${e.message}`)
    }

    next()
  })
vorpal
  .delimiter('loopy$')
  .show()
