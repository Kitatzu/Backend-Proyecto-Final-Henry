const { Categories } = require("../db");

const getAllCategories = async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      try {
        let categoriesDb = await Categories.findAll();
        categoriesDb.length
          ? res.status(200).json({
              Status: "Success",
              Categories: categoriesDb,
            })
          : res.status(404).json({
              Status: "Alert",
              Message: "There are no categories to display",
            });
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      let category = await Categories.findOne({
        where: {
          name,
        },
      });
      category  ? res.status(200).json({ Status: "Success", Category: category })
      : res.json({ Status: "Alert", Message: "Category not found" });
    }
  } catch (error) {
    return res.status(500).send("ERROR: ", error);
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await Categories.create({ name });
    res.status(201).json({Message:"Category created successfully",newCategory});
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const categoryUpdated = await Categories.findByPk(id);
    categoryUpdated.name = name;
    await categoryUpdated.save();
    res.status(200).json({Message:"Category updated successfully",categoryUpdated});
  } catch (error) {
    res.status(500).json(error);
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Categories.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({Message:"Category successfully removed"});
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
