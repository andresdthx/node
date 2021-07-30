/* eslint-disable no-undef */

const axios = require('axios');

const urlPayu = process.env.PAYU_URL || 'https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi';
const apiLogin = process.env.API_LOGIN || 'pRRXKOl8ikMmt9u';
const apiKey = process.env.API_KEY || '4Vj8eK4rloUd272L48hsrarnUA';
const accountId = process.env.ACCOUNT_ID || '512321';

const getBanks = async () => {
    return await axios.post(urlPayu, {
        "language": "es",
        "command": "GET_BANKS_LIST",
        "merchant": {
         "apiLogin": apiLogin,
         "apiKey": apiKey
        },
        "test": false,
        "bankListInformation": {
        "paymentMethod": "PSE",
        "paymentCountry": "CO"
        }
    });
}

const PsePayment = async (transaction, order) => {
    return await axios.post(urlPayu, {
        "language": "es",
        "command": "SUBMIT_TRANSACTION",
        "merchant": {
           "apiKey": apiKey,
           "apiLogin": apiLogin
        },
        "transaction": {
           "order": {
              "accountId": accountId,
              "referenceCode": "857843085",
              "description": "payment test",
              "language": "es",
              "signature": order._id,
              "notifyUrl": "http://www.tes.com/confirmation",
              "additionalValues": {
                 "TX_VALUE": {
                    "value": order.itemsPrice,
                    "currency": "USD"
              },
                 "TX_TAX": {
                    "value": order.taxPrice,
                    "currency": "USD"
              },
                 "TX_TAX_RETURN_BASE": {
                    "value": 0,
                    "currency": "USD"
              }
              },
              "buyer": {
                 "emailAddress": "buyer_test@test.com"
              }
           },
           "payer": {
              "fullName": order.shippingAddress.fullName,
              "emailAddress": "payer_test@test.com",
              "contactPhone": transaction.phone
           },
           "extraParameters": {
              "RESPONSE_URL": "http://www.test.com/response",
              "PSE_REFERENCE1": "127.0.0.1",
              "FINANCIAL_INSTITUTION_CODE": transaction.bank,
              "USER_TYPE": transaction.typeClient,
              "PSE_REFERENCE2": transaction.typeIdentification,
              "PSE_REFERENCE3": transaction.identification
           },
           "type": "AUTHORIZATION_AND_CAPTURE",
           "paymentMethod": "PSE",
           "paymentCountry": "CO",
           "ipAddress": "127.0.0.1",
           "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
           "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
        },
        "test": true
     })
}

// PsePayment().then(res => console.log(res))
module.exports = {
    getBanks,
    PsePayment
};