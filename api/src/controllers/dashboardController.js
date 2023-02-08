const { Facturas, ProductsInCart, Users } = require("../db");

const getDataProductsSold = async () => {};
const getDataSold = async () => {
  try {
    const suma = await Facturas.sum("total");
    console.log(suma);
    const promedio = suma / 2800.0;
    return promedio;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = { getDataProductsSold, getDataSold };
