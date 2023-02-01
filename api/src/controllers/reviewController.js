const { Reviews, Users, Products } = require("../db");

const calculateRating = async (productId, userId) => {
  //TODO:RATING USUARIOS
  try {
    const usuarios = await Users.count();
    const suma = await Reviews.sum("rating", { where: { productId } });
    //TODO:CALCULATE
    let result = suma / usuarios;
    if (result > 5) return 5;
    return suma / usuarios;
  } catch (e) {
    return e;
  }
};

const saveReview = async (req, res) => {
  const { userId, productId, rating, review } = req.body;
  //TODO:
  try {
    const newReview = await Reviews.create({
      rating,
      review,
      userId,
      productId,
    });
    const findProduct = await Products.findByPk(productId);

    console.log(newReview, findProduct.rating);
    //TODO: Calcular rating formula: E(rating del product)/cantidad de usuarios
    const suma = await calculateRating(productId, userId);
    await findProduct.update({ rating: suma });

    res.status(200).json({ status: "success", newReview, findProduct, suma });
  } catch (e) {
    console.log(e);
    res.status(500).send("Error");
  }
};
module.exports = { saveReview };
