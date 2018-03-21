const axios = require('axios')
module.exports = async ({ customerId }, authCode) => {
  const { API_URL } = process.env
  return axios.post(`${API_URL}/pfm-web/accounts/get/all.action`, {
    headers: {
      'Authorization': 'Bearer ' + authCode
    }
  })
}
