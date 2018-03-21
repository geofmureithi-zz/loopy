const expect = require('chai').expect
const { resolve } = require('path')
const login = require(resolve('src/endpoints/login'))
describe('Login', () => {
  it('successfully logins', async function () {
    this.timeout(10000)
    const { TEST_USERNAME, TEST_PASSWORD } = process.env
    expect(login).to.be.a('function')
    const resp = await login(TEST_USERNAME, TEST_PASSWORD)
    global.AUTH_CODE = resp.headers['auth-token']
    global.USER = resp.data
    expect(resp.status).to.be.equal(200)
  })
})
