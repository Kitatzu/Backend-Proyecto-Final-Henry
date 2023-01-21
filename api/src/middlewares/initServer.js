const { Roles, Categories, Proveedores, Brands } = require("../db.js");

async function createRoles() {
  try {
    const allRoles = await Roles.findAll();

    if (allRoles.length) return;

    const values = await Promise.all([
      await Roles.create({ rol: "Admin" }),
      await Roles.create({ rol: "Vendor" }),
      await Roles.create({ rol: "User" }),
    ]);
  } catch (error) {
    console.error(error);
  }
}

async function createCategories() {
  try {
    const allCategories = await Categories.findAll();

    if (allCategories.length) return;

    const categories = await Promise.all([
      await Categories.create({ name: "Ram" }),
      await Categories.create({ name: "Computadora" }),
      await Categories.create({ name: "Motherboard" }),
      await Categories.create({ name: "Almacenamiento" }),
      await Categories.create({ name: "Periferico" }),
      await Categories.create({ name: "Monitor" }),
      await Categories.create({ name: "Fuente de alimentacion" }),
    ]);
  } catch (error) {
    console.log(error);
  }
}

async function createProviders() {
  try {
    const allProviders = await Proveedores.findAll();

    if (allProviders.length) return;

    const providers = await Promise.all([
      await Proveedores.create({
        proveedor: "Gygabyte",
        phone: "1",
        email: "gygabite@gmail.com",
      }),
      await Proveedores.create({
        proveedor: "Adata",
        phone: "2",
        email: "adata@gmail.com",
      }),
      await Proveedores.create({
        proveedor: "Nvidia",
        phone: "3",
        email: "nvidia@gmail.com",
      }),
      await Proveedores.create({
        proveedor: "Intel",
        phone: "4",
        email: "intel@gmail.com",
      }),
    ]);
  } catch (error) {
    console.log(error);
  }
}
//TODO:PERDONAME LA VIDA!xD
async function createBrands() {
  try {
    const allBrands = await Brands.findAll();
    if (allBrands.length) return;
    const brands = await Promise.all([
      await Brands.create({ brand: "Intel" }),
      await Brands.create({ brand: "Nvidia" }),
      await Brands.create({ brand: "Amd" }),
      await Brands.create({ brand: "Adata" }),
      await Brands.create({ brand: "Toshiba" }),
      await Brands.create({ brand: "Samsung" }),
      await Brands.create({ brand: "Arktek" }),
      await Brands.create({ brand: "Gigabyte" }),
      await Brands.create({ brand: "Asus" }),
      await Brands.create({ brand: "MSI" }),
      await Brands.create({ brand: "Asrock" }),
      await Brands.create({ brand: "Scorpion" }),
    ]);
  } catch (e) {
    console.error(error);
  }
}
module.exports = {
  createRoles,
  createCategories,
  createProviders,
  createBrands,
};
