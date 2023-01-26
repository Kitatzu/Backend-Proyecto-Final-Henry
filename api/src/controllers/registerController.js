const { Users, Carts, Roles } = require("../db.js");
const jwt = require("jsonwebtoken"); //token
const bcrypt = require("bcrypt"); //hash
const fs = require("fs-extra");
const { uploadAvatarImage } = require("../middlewares/cloudinary.js");
const nodemailer=require("nodemailer")

async function verification (correo,code) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "valcoellar@gmail.com", 
      pass: "rnrlnllvfcbjcvsf", 
    },
    });  
  
    let info = await transporter.sendMail({
      from: '"Boxtech" <account@boxtech.com>', 
      to: correo, // receivers
      subject: "Boxtech", // Subject line
      text: "verification code!!!", // plain text body
      html: `<b>your verificarion code is: ${code}</b>`, // html body
    });
  
  };

async function register(req, res) {
  let {
    firstName,
    lastName,
    birthday,
    userName,
    email,
    password,
    country,
    phone,
    rol,
  } = req.body;

  function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  let code=getRandomInt(100000,999999);
  console.log(code);

  try {
    let findUserName = await Users.findOne({ where: { userName } });
    let findEmail = await Users.findOne({ where: { email } });

    if (findUserName)
      return res.status(400).json(`the username ${userName} is registered`);
    if (findEmail)
      return res.status(400).json(`the email ${email} is registered`);

    if (req.files?.avatar) {
      try {
        const newCart = await Carts.create({
          totalPrice: 0,
        });

        const avatarImg = await uploadAvatarImage(
          req.files.avatar.tempFilePath
        );

        if (rol) {
          let findRole = await Roles.findOne({ where: { rol } });

          let newUser = await Users.create({
            avatar: avatarImg.secure_url,
            avatarId: avatarImg.public_id,
            firstName: firstName,
            lastName: lastName,
            birthday: birthday,
            userName: userName,
            email: email,
            password: await bcrypt.hash(password, 10),
            country,
            phone,
            cartId: newCart.id,
            verifCode:code,
          });

          await fs.unlink(req.files.avatar.tempFilePath);

          await newUser.setRole(findRole);

          let token = jwt.sign(
            {
              //creo token
              id: newUser.cartId,
              name: userName,
              role: rol,
            },
            process.env.TOKEN
          );
          verification(newUser.email,newUser.verifCode);

          res.status(200).json({
            message: "Succefully registered",
            ...newUser.dataValues,
            token,
          });
        } else {
          let userRole = await Roles.findOne({ where: { rol: "User" } });
          let newUser = await Users.create({
            avatar: avatarImg.secure_url,
            avatarId: avatarImg.public_id,
            firstName: firstName,
            lastName: lastName,
            birthday: birthday,
            userName: userName,
            email: email,
            password: await bcrypt.hash(password, 10),
            country,
            phone,
            cartId: newCart.id,
            verifCode:code,
          });

          await fs.unlink(req.files.avatar.tempFilePath);

          await newUser.setRole(userRole);

          let token = jwt.sign(
            {
              //creo token
              id: newUser.cartId,
              name: userName,
              role: rol,
            },
            process.env.TOKEN
          );
          verification(newUser.email,newUser.verifCode);
          res.status(200).json({
            message: "Succefully registered",
            ...newUser.dataValues,
            token,
          });
        }
      } catch (error) {
        res.status(400).json({ message: error });
      }
    } else {
      const newCart = await Carts.create({
        totalPrice: 0,
      });

      if (rol) {
        let findRole = await Roles.findOne({ where: { rol } });

        let newUser = await Users.create({
          firstName: firstName,
          lastName: lastName,
          birthday: birthday,
          userName: userName,
          email: email,
          password: await bcrypt.hash(password, 10),
          country,
          phone,
          cartId: newCart.id,
          verifCode:code,
        });

        await newUser.setRole(findRole);

        let token = jwt.sign(
          {
            //creo token
            id: newUser.cartId,
            name: userName,
            role: rol,
          },
          process.env.TOKEN
        );
        verification(newUser.email,newUser.verifCode);
        res.status(200).json({
          message: "Succefully registered",
          ...newUser.dataValues,
          token,
        });
      } else {
        let userRole = await Roles.findOne({ where: { rol: "User" } });
        let newUser = await Users.create({
          firstName: firstName,
          lastName: lastName,
          birthday: birthday,
          userName: userName,
          email: email,
          password: await bcrypt.hash(password, 10),
          country,
          phone,
          cartId: newCart.id,
          verifCode:code,
        });

        await newUser.setRole(userRole);

        let token = jwt.sign(
          {
            //creo token
            id: newUser.cartId,
            name: userName,
            role: rol,
          },
          process.env.TOKEN
        );
        verification(newUser.email,newUser.verifCode);
        res.status(200).json({
          message: "Succefully registered",
          ...newUser.dataValues,
          token,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

module.exports = { register };
