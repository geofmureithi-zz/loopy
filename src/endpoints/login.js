const axios = require('axios')
module.exports = async (userName, password) => {
  const { API_URL } = process.env
  return axios.post(`${API_URL}/customer/login`, {
    userName,
    password
  })
}
