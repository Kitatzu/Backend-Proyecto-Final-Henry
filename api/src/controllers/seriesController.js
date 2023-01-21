const { Products, Series } = require("../db");
const { Op } = require("sequelize");
const addSerieProduct = async (req, res) => {
  const { serie, productId } = req.body;
  try {
    const findProduct = await Products.findByPk(productId);
    console.log(findProduct);
    const newSerie = await Series.create({
      serie,
    });
    await findProduct.addSeries(newSerie);
    const stock = await Series.count({
      where: { [Op.and]: [{ productId }, { status: { [Op.eq]: 1 } }] },
    });
    console.log(stock);
    await findProduct.update({ stock, status: 1 });
    return res
      .status(200)
      .json({ status: "success", msg: "Serie agregada correctamente!" });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ status: "error", msg: "No se han agregado las series!" });
  }
};
module.exports = {
  addSerieProduct,
};
