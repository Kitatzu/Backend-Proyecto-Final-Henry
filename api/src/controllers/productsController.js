const { Products, Categories, Proveedores } = require("../db");

async function getProducts(req, res) {
  const name = req.query.name;
  let reqProd = [];
  try {
    if (name) {
      try {
        let nameP = await Products.findAll({
          where: { status: 1 },
          include: [
            { model: Categories, attributes: ["name"] },
            { model: Proveedores, attributes: ["proveedor"] },
          ],
        });
        for (let i of nameP) {
          if (i.name.includes(name)) {
            reqProd.push(i);
          }
        }
        if (reqProd.length) {
          return res.status(200).json(reqProd);
        } else {
          return res.status(400).json({ message: "unmatched product name" });
        }
      } catch (error) {
        return res
          .status(400)
          .json({ message: "error searching product by name", error });
      }
    } else {
      try {
        let aux2 = await Products.findAll({
          where: { status: 1 },
          include: [
            { model: Categories, attributes: ["name"] },
            { model: Proveedores, attributes: ["proveedor"] },
          ],
        });
        reqProd.push(aux2);
        return res.status(200).json(reqProd);
      } catch (error) {
        return res
          .status(400)
          .json({ meesage: "error searching all products", error });
      }
    }
  } catch (error) {
    return res.status(400).send("error controller getProduct");
  }
}

async function productsId(req, res) {
  const { id } = req.params;

  try {
    let aux3 = await Products.findByPk(id);
    return res.status(200).json(aux3);
  } catch (error) {
    return res.status(400).send("unmatch id");
  }
}

const postProducts = async (req, res) => {
  const {
    status,
    name,
    description,
    img,
    categories,
    serieProducto,
    price,
    descuento,
    typeProduct,
    marca,
    proveedor,
    rating,
  } = req.body;

  try {
    let newProduct = await Products.create({
      status,
      name,
      description,
      img,
      serieProducto,
      price,
      descuento,
      typeProduct,
      marca,
      rating,
    });

    let allCategories = await Categories.findAll({
      where: { name: categories },
    });

    await newProduct.addCategories(allCategories);

    let findProvider = await Proveedores.findOne({
      where: { proveedor },
    });

    await newProduct.setProveedore(findProvider);

    return res
      .status(200)
      .json({ message: "product added successfully", newProduct });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

async function deleteProducts(req, res) {
  let { id } = req.params;

  try {
    const product = await Products.destroy({ where: { id: id } });
    res.status(200).json({ message: "Product deleted", product });
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

async function updateProducts(req, res) {
  let { id } = req.params;
  let {
    status,
    name,
    description,
    img,
    serieProducto,
    price,
    descuento,
    typeProduct,
    marca,
    rating,
  } = req.body;

  try {
    let findProduct = await Products.findByPk(id);

    let update = await findProduct.update({
      status: status,
      name: name,
      description: description,
      img: img,
      serieProducto: serieProducto,
      price: price,
      descuento: descuento,
      typeProduct: typeProduct,
      marca: marca,
      rating: rating,
    });

    res.status(201).json({ message: "Product Updated", update });
  } catch (error) {}
}

module.exports = {
  postProducts,
  getProducts,
  productsId,
  updateProducts,
  deleteProducts,
};
