const axios = require('axios')
module.exports = async (authCode, fromDate = '1970-01-01') => {
  const { API_URL } = process.env
  return axios.get(`${API_URL}/pfm-web/analysis/expensesincomes/get.action?params.fromDate=${fromDate}`, {
    headers: {
      'Authorization': 'Bearer ' + authCode
    }
  })
}
