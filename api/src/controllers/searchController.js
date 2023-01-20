const { Products, Categories, Proveedores } = require("../db");
const { Op } = require("sequelize");

const search = async (req, res) => {
  const { name } = req.query;
  try {
    const searchP = await Products.findAll({
      include: [
        {
          model: Categories,
          attributes: ["name"],
        },
        {
          model: Proveedores,
          attributes: ["proveedor"],
        },
      ],
      where: {
        name: {
          [Op.substring]: name,
        },
        status: 1,
      },
    });
    if (searchP.length) {
      return res.status(200).json(searchP);
    } else {
      return res.status(400).send("unmatch search");
    }
  } catch (error) {
    return res.status(400).send("search failed");
  }
};

module.exports = { search };
