const { Users, Carts, Roles } = require("../db.js");

async function register(req, res) {
  let { firstName, lastName, fechaNacimiento, userName, email, password, rol } =
    req.body;

  try {
    let findUserName = await Users.findOne({ where: { userName } });
    let findEmail = await Users.findOne({ where: { email } });

    if (findUserName)
      return res.status(400).json(`the username ${userName} is registered`);
    if (findEmail)
      return res.status(400).json(`the email ${email} is registered`);

    const newCart = await Carts.create({
      totalPrice: 0,
    });

    if (rol) {
      let findRole = await Roles.findOne({ where: { rol } });

      let newUser = await Users.create({
        firstName: firstName,
        lastName: lastName,
        fechaNacimiento: fechaNacimiento,
        userName: userName,
        email: email,
        password: password,
        cartId: newCart.id,
      });

      await newUser.setRole(findRole);

      res
        .status(200)
        .json({ message: "Succefully registered", ...newUser.dataValues });
    } else {
      let userRole = await Roles.findOne({ where: { rol: "User" } });
      let newUser = await Users.create({
        firstName: firstName,
        lastName: lastName,
        fechaNacimiento: fechaNacimiento,
        userName: userName,
        email: email,
        password: password,
        cartId: newCart.id,
      });

      await newUser.setRole(userRole);

      res
        .status(200)
        .json({ message: "Succefully registered", ...newUser.dataValues });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

module.exports = { register };
