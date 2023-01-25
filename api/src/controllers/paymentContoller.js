require('dotenv').config();
const axios = require("axios");
const api = process.env.PAYPAL_API
const apiClient = process.env.PAYPAL_API_CLIENT
const apiSecret = process.env.PAYPAL_API_SECRET

const createOrder = async (req, res) => {
    try{
    //Doc:  https://developer.paypal.com/docs/api/orders/v2/
    const { value, description } = req.body;
    const order = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value
                }
            },
            description
        ],
        application_contex: {
            brand_name: "Henry PF",
            landing_page: "LOGIN", 
            user_action: "PAY_NOW",
            return_url: "localhost:3001/home",
            cancel_url: "localhost:3001/home"
        }
    }

    const params = new URLSearchParams();
    params.append("grand_type", "client_credentials");

    //Getting token: https://developer.paypal.com/reference/get-an-access-token/
    const { data: { access_token } } = await axios.post("https://api-m.sandbox.paypal.com/v1/oauth2/token", params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
            username: apiClient,
            password: apiSecret
        }
    })
    //Create order: https://developer.paypal.com/api/rest/requests/
    const response = await axios.post(`${api}/v2/checkout/orders`, order, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
    res.json(response.data);

    } catch(error) {

    }
    
}

const captureOrder = async (req, res) => {

}

const cancelOrder = async (req, res) => {

}

module.exports = { createOrder, captureOrder, cancelOrder };