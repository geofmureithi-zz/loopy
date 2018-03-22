const vorpal = require('vorpal')()
require('dotenv').config()
const Table = require('cli-table')
const login = require('./endpoints/login')
const checkBalance = require('./endpoints/check-balance')
const sendToMobile = require('./endpoints/send-to-mobile')
const checkIncomeExpenses = require('./endpoints/expenses-income')

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
        if (resp.data.returnCode === 3509) throw new Error(resp.data.returnMessage)
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
  .command('check-expenditure', 'Gives you a log of how you have spent money')
  .action(async function (args, next) {
    try {
      const resp = await checkIncomeExpenses(authCode)
      const table = new Table({
        head: ['Account', 'Month', 'Amount', 'Transactions'],
        colWidths: [30, 30, 30, 30]
      })
      const expenses = resp.data.result.expensesIncomes
      if (expenses && expenses.length) expenses.map(({ accId, month, amount, number }) => table.push([ accId, month, amount, number ]))
      this.log(`-------------------Expenses & Income ------------------`)
      this.log(table.toString())
    } catch (e) {
      this.log(`Check expenditure Failed. Reason: ${e.message}`)
    }

    next()
  })
vorpal
  .command('transfer-to-mobile', 'Send your Bae some money :)')
  .action(function (args, next) {
    const promise = this.prompt([
      {
        type: 'input',
        name: 'amount',
        message: 'Enter Amount: '
      },
      {
        type: 'input',
        name: 'msisdn',
        message: 'Enter Phone Number (beginning with 254): '
      },
      {
        type: 'input',
        name: 'purpose',
        message: 'What is the transfer for?: '
      }
    ])

    promise.then(async (inputs) => {
      const { amount, msisdn, purpose } = inputs
      try {
        const resp = await sendToMobile(amount, msisdn, purpose, user, authCode);
        
        if(resp.data && resp.data.balanceAfterTxn === -1){
          this.log("Oops! You don't seem to have that much in your account.");
        } else {
          this.log(`${resp.data.transactionId} Confirmed, Ksh ${amount} has been transfered to ${msisdn}. Purpose: ${purpose}`);
        }
      } catch (e) {
        this.log(`Transfer Failed. Reason: ${e.message}`)
      }
      next()
    })
  })
vorpal
  .delimiter('loopy$')
  .show()
  .log('Welcome to Loopy, Please enter your loop email & password to continue')
  .exec('login')
