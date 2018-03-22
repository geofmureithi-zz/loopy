const axios = require('axios')
module.exports = async (amount, msisdn, purpose, { customerId }, authCode) => {
  const { API_URL } = process.env
  return axios.post(`${API_URL}/customer/transfers/transferToMobile`, {
    customerId,
    amount,
    categoryId: 39,
    categoryName: 'Cash, Transfers',
    frequencyOfPayment: 0,
    isRegularPayment: 0,
    mobileNumber: msisdn,
    mobileNumberCCode: 'KE',
    purpose,
    subcategoryId: 43,
    subcategoryName: 'Internal Money Transfer',
    transferMethod: 4 // Mobile I Guess
  }, {
    headers: {
      'Authorization': 'Bearer ' + authCode
    }
  })
}
