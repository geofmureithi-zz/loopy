# Loopy
![CBA Loop on CLI](https://i.imgur.com/v4BTJLv.png)

<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Standard - JavaScript Style Guide"></a>

Loopy is an unofficial cli client for CBA Loop. Loopy allows you to

  - Query Account balance
  - See your expenditure
  - Send money to M-Pesa via cli

![CBA Loop on CLI](https://i.imgur.com/QHOrCgB.gif)

#### New Features Coming soon!

  - Move money to bank
  - Create investments
  - Global lib so you can just do `loopy` in your bash

#### Why?

I wanted to send my mother money without leaving the terminal (talk of being lazy!!), so I setup this.
This can be very important in automation of your bill payments :)

### Tech

Loopy uses a number of open source projects to work properly:

- Axios - The Awesome Request lib for browser and node
- Vorpal - awesome lib for creating cli
- Dotenv - for testing purposes
- Mocha && Chai

### Installation

Loopy requires [Node.js](https://nodejs.org/) v7+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ git clone <url>
$ cd loopy
$ npm install
$ npm start
```

### Actions

Loopy has the following actions

```
loopy$ help

  Commands:

    help [command...]    Provides help for a given command.
    exit                 Exits application.
    login                Logins to Servers and gets Access Token
    check-balance        Checks Account balance for the logged in user
    check-expenditure    Gives you a log of how you have spent money
    transfer-to-mobile   Send your Bae some money :)

```

### Development

Want to contribute? Great!
Just clone this repo, add your changes and then create a PR


### Todos

 - Write MORE Tests
 - Add More Endpoints

License
----

MIT


**Free Software, Hell Yeah!**

Disclaimer: This library (and repo) is not in way assosiated with CBA or CBA loop and any views expressed are strictly mine.
