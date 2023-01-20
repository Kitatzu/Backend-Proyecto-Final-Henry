const { Products, Proveedores } = require("../db");
const SetProveedores = async (req, res) => {
  const {
    name,
    description,
    serieProducto,
    descuento,
    typeProduct,
    marca,
    price,
    rating,
    proveedor,
  } = req.body;
  try {
    const product = await Products.create({
      name,
      description,
      serieProducto,
      descuento,
      typeProduct,
      marca,
      price,
      rating,
    });
    console.log(product);
    const findproveedor = await Proveedores.findOne({ where: { proveedor } });
    console.log(findproveedor);
    console.log(await product.setProveedore(findproveedor));
    res.status(200).json({ status: "success", product, findproveedor });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: "error", msg: e });
  }
};
module.exports = {
  SetProveedores,
};
