const axios = require('axios')
module.exports = async (authCode) => {
  const { API_URL } = process.env
  return axios.get(`${API_URL}/customer/transfers/getTransferTypes`, {
    headers: {
      'Authorization': 'Bearer ' + authCode
    }
  })
}
