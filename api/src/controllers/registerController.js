const { Users, Carts, Roles } = require("../db.js");
const jwt=require("jsonwebtoken");//token
const bcrypt=require("bcryptjs"); //hash

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
        password:  await bcrypt.hash(password,10),
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
        password:  await bcrypt.hash(password,10),
        cartId: newCart.id,
      });

      await newUser.setRole(userRole);

      let token=jwt.sign({//creo token
        id:newUser.cartId,
        name:userName
      },process.env.TOKEN)
      res
        .status(200)
        .json({ message: "Succefully registered", ...newUser.dataValues });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

module.exports = { register };
