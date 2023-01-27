const { Users, Roles } = require("../db.js");
const nodemailer = require("nodemailer");
const { updateAvatarImage } = require("../middlewares/cloudinary.js");
const fs = require("fs-extra");

async function allUsers(req, res) {
  let { userName } = req.query;

  if (userName) {
    try {
      let findUser = await Users.findAll({
        where: { userName },
        include: {
          model: Roles,
          attributes: ["rol"],
        },
      });

      findUser
        ? res.status(201).json({ ...findUser[0].dataValue })
        : res.status(400).json("user not found");
    } catch (error) {
      res.status(400).json({ message: error });
    }
  } else {
    try {
      let allUsers = await Users.findAll({
        include: {
          model: Roles,
          attributes: ["rol"],
        },
      });

      res.status(200).json(allUsers);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}

async function boxSend(req, res) {
  let { correo } = req.body;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "valcoellar@gmail.com",
      pass: "rnrlnllvfcbjcvsf",
    },
  });

  // messages ----------------------

  let accion = "exito";
  if (accion == "exito") {
    let info = await transporter.sendMail({
      from: '"Boxtech" <account@boxtech.com>',
      to: correo, // receivers
      subject: "Boxtech", // Subject line
      text: "Thank you for your purchase!!", // plain text body
      html: "<b>Thank you for your purchase!!</b>", // html body
    });
  }
}

async function updateUser(req, res) {
  let { id } = req.params;
  const { userName, city, country, phone } = req.body;

  if (req.files?.avatar) {
    try {
      let user = await Users.findByPk(id, {
        include: {
          model: Roles,
          attributes: ["rol"],
        },
      });

      let findUser = await Users.findOne({ where: { userName } });

      const avatarUpdate = await updateAvatarImage(
        req.files.avatar.tempFilePath,
        user.avatarId
      );

      if (user.userName === userName) {
        return res.status(404).json(`the username ${userName} is r epeat`);
      }
      if (findUser) {
        return res.status(400).json(`the username ${userName} is registered`);
      } else {
        let userUpdate = await user.update({
          avatar: avatarUpdate.secure_url,
          avatarId: avatarUpdate.public_id,
          userName: userName,
          city: city,
          country: country,
          phone: phone,
        });

        res.status(200).json({ ...userUpdate.dataValues });
      }

      await fs.unlink(req.files.avatar.tempFilePath);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  } else {
    try {
      let user = await Users.findByPk(id, {
        include: {
          model: Roles,
          attributes: ["rol"],
        },
      });

      let findUser = await Users.findOne({ where: { userName } });

      if (user.userName === userName)
        return res.status(404).json(`the username ${userName} is repeat`);
      if (findUser)
        return res.status(400).json(`the username ${userName} is registered`);

      let userUpdate = await user.update({
        userName: userName,
        city: city,
        country: country,
        phone: phone,
      });

      res.status(200).json({ ...userUpdate.dataValues, newToken });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
}


module.exports = { allUsers, updateUser, boxSend };

