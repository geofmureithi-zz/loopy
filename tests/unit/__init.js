const { resolve } = require('path')
require('dotenv').config()
require('dotenv').config({ path: resolve('tests/test.env') })
global.AUTH_CODE = ''
