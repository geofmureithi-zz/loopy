const axios = require('axios')
module.exports = async ({ customerId }, authCode) => {
  const { API_URL } = process.env
  return axios.post(`${API_URL}/customer/accounts/getAccountBalance`, {
    customerId
  }, {
    headers: {
      'Authorization': 'Bearer ' + authCode
    }
  })
}
