const { Categories } = require("../db");

const getAllCategories = async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      try {
        let categoriesDb = await Categories.findAll();
        categoriesDb.length
          ? res.status(200).json(categoriesDb)
          : res.status(404).json("There are no categories to display");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      let category = await Categories.findOne({
        where: {
          name,
        },
      });
      category?res.json(category):res.send("Category not found")
    }
  } catch (error) {
    return res.status(500).send("ERROR: ", error);
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await Categories.create({ name });
    /*  res.send("Category created"); */
    res.status(201).json("Category created successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Categories.findByPk(id);
    category.name = name;
    await category.save();
    res.send("Category updated successfully");
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
    res.send("Category successfully removed");
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
