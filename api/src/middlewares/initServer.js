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
      await Categories.create({
        name: "Placa de video",
        img: "https://dlcdnwebimgs.asus.com/gain/131c99bd-c072-478b-91c0-497178564bcb/w800",
      }),
      await Categories.create({
        name: "Procesador",
        img: "https://keagamerstore.com/wp-content/uploads/2023/01/1-3-247x247.png",
      }),
      await Categories.create({
        name: "Ram",
        img: "https://www.tecnosmart.com.ec/wp-content/uploads/2021/08/Kit-Ram-CORSAIR-Dominator-Platinum-8GB-2x4GB-DDR4-4000MHz_Memoria-Ram_3538_1.png",
      }),
      await Categories.create({
        name: "Computadora",
        img: "https://portal-center.com/wp-content/uploads/2020/09/PC-GAMER.png",
      }),
      await Categories.create({
        name: "Motherboard",
        img: "https://i0.wp.com/nomadaware.com.ec/wp-content/uploads/2021/02/NomadaWare_motherboard_asus_tuf_b460m_plus_wifi-3.png?fit=1000%2C1000&ssl=1",
      }),
      await Categories.create({
        name: "Almacenamiento",
        img: "https://novicompu.vtexassets.com/arquivos/ids/161617/1PWES1232.png?v=637662160021630000",
      }),
      await Categories.create({
        name: "Periferico",
        img: "https://tiaecuador.vtexassets.com/arquivos/ids/206333-800-auto?v=638025866682200000&width=800&height=auto&aspect=true",
      }),
      await Categories.create({
        name: "Monitor",
        img: "https://davidpc.net/wp-content/uploads/2022/08/4-4-1.png",
      }),
      await Categories.create({
        name: "Fuente de alimentacion",
        img: "https://sites.google.com/site/mmelasespenetas/_/rsrc/1490266685908/contenidos-mme/fuentes-de-alimentacion/fuente_alimentacion_modular.png",
      }),
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
