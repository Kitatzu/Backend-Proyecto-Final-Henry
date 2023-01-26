const { Carts, Users, Products, ProductsInCart, Facturas, Orders } = require("../db");

const getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const { cartId } = await Users.findByPk(userId);
        const cart = await Carts.findByPk(cartId)
        return res.status(200).json({cart});
    } catch(error) {
        return res.status(404).json({msg: error});
    } 
}

const createCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const findUser = await Users.findByPk(userId, { include: { model: Carts}});
        const findProduct = await Products.findByPk(productId);

         if(!findProduct) {
            const products = await ProductsInCart.create({ productId, cartId: findUser.cartId, quantity});
            const cart = await Carts.findByPk(products.cartId);
            const total = cart.totalPrice;
            await Carts.update({ 
                totalPrice : parseFloat(total + findProduct.price) * parseInt(quantity)
            }, {where: { id: products.cartId}});
            await Orders.create({ })
            //await Facturas.create({total, });
            //await Carts.update({ status: "Success" });
            return res.status(200).send("Succesfully added to the Cart")
        }
            return res.status(200).send("Error adding to the Cart")
    } catch(error) {
       return res.status(404).send("Something went wrong");    
    }
}

module.exports = { getCart, createCart };