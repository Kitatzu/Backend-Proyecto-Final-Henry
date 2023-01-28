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
      await Categories.create({ name: "Placa de video" }),
      await Categories.create({ name: "Procesador" }),
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
        provider: "Gygabyte",
        phone: "1",
        email: "gygabite@gmail.com",
      }),
      await Proveedores.create({
        provider: "Adata",
        phone: "2",
        email: "adata@gmail.com",
      }),
      await Proveedores.create({
        provider: "Nvidia",
        phone: "3",
        email: "nvidia@gmail.com",
      }),
      await Proveedores.create({
        provider: "Intel",
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
      await Brands.create({
        brand: "Intel",
        img: "https://res.cloudinary.com/debfwgutb/image/upload/v1674932741/Brand/Intel.png",
      }),
      await Brands.create({
        brand: "Nvidia",
        img: "https://res.cloudinary.com/debfwgutb/image/upload/v1674932784/Brand/Nvidia.png",
      }),
      await Brands.create({
        brand: "Amd",
        img: "https://res.cloudinary.com/debfwgutb/image/upload/v1674932848/Brand/Amd.jpg",
      }),
      await Brands.create({
        brand: "Adata",
        img: "https://res.cloudinary.com/debfwgutb/image/upload/v1674932866/Brand/Adata.png",
      }),
      await Brands.create({
        brand: "Toshiba",
        img: "https://res.cloudinary.com/debfwgutb/image/upload/v1674932878/Brand/Toshiba.png",
      }),
      await Brands.create({
        brand: "Samsung",
        img: "https://res.cloudinary.com/debfwgutb/image/upload/v1674932993/Brand/Samsung.png",
      }),
      await Brands.create({
        brand: "Gigabyte",
        img: "https://res.cloudinary.com/debfwgutb/image/upload/v1674933026/Brand/Gigabyte.png",
      }),
      await Brands.create({
        brand: "Asus",
        img: "https://res.cloudinary.com/debfwgutb/image/upload/v1674933087/Brand/Asus.png",
      }),
      await Brands.create({
        brand: "MSI",
        img: "https://res.cloudinary.com/debfwgutb/image/upload/v1674933102/Brand/Msi.png",
      }),
      await Brands.create({
        brand: "Asrock",
        img: "https://res.cloudinary.com/debfwgutb/image/upload/v1674933114/Brand/Asrock.png",
      }),
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
