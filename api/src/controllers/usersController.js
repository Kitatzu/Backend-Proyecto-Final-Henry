const { Users, Roles } = require("../db.js");
const nodemailer = require("nodemailer");
const { updateAvatarImage } = require("../middlewares/cloudinary.js");
const fs = require("fs-extra");

async function allUsers(req, res) {
  let { userName } = req.query;

  if (userName) {
    try {
      let findUser = await Users.findAll({
        where: { userName, status: 1 },
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
        where: { status: 1 },
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

async function statusCero(req, res) {
  try {
    let allUsers = await Users.findAll({
      where: { status: 0 },
      include: { model: Roles, attributes: ["rol"] },
    });

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

async function deleteUser(req, res) {
  let { id } = req.params;
  try {
    let user = await Users.findByPk(id);
    const del = await user.update({ status: 0 });
    res.status(200).json({ message: "Deleted", del });
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

async function restoreUser(req, res) {
  let { id } = req.params;
  try {
    let findUser = await Users.findByPk(id);
    const restore = await findUser.update({ status: 1 });
    res.status(200).json({ message: "Restored!", restore });
  } catch (error) {
    res.status(400).json({ message: error });
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

module.exports = {
  allUsers,
  statusCero,
  updateUser,
  deleteUser,
  restoreUser,
};
