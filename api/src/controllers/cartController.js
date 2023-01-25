const { Carts, Users, Products } = require("../db");

const getCart = async (req, res) => {
    const { id } = req.params
    try{
        const searchCart = await Users.findByPk(id);
        if(searchCart.length) return res.status(200).send(searchCart);
        return res.status(400).send("No match!");
    } catch(error) {
        //  return res.status(400).send("Something went wrong");
        return console.log(error)
    } 
}

const createCart = async (req, res) => {
    const { userId, productID, quantity } = req.body;
    try {
        const findUser = await Users.findByPk(userId)
        const findUserCart = await Users.findByPk(findUser.cartId)
        console.log(searchProduct)
        return console.log("Post Cart")
    } catch(error) {
       return res.status(404).send("Something went wrong");
       
    }
}

module.exports = { getCart, createCart };