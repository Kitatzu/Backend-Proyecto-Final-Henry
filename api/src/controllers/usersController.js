const { Users, Roles } = require("../db.js");
const nodemailer = require("nodemailer");
const { updateAvatarImage } = require("../middlewares/cloudinary.js");
const fs = require("fs-extra");
const {Op}=require("sequelize")


async function allUsers(req, res) {
  let { email } = req.query;
  console.log(email);
  if (email) {
    try {
      let findUser = await Users.findAll({
        where: { email },

        include: {
          model: Roles,
          attributes: ["rol"],
        },
      });
      console.log(findUser);
      findUser
        ? res.status(201).json({ ...findUser[0].dataValues })
        : res.status(400).json("user not found");
    } catch (error) {
      console.log(error);
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

async function oneUser(req, res) {
  let { id } = req.params;
  try {
    let user = await Users.findByPk(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
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
  const { email, city, country, phone } = req.body;

  if (req.files?.avatar) {
    try {
      let user = await Users.findByPk(id, {
        include: {
          model: Roles,
          attributes: ["rol"],
        },
      });

      let findUser = await Users.findOne({ where: { email } });

      const avatarUpdate = await updateAvatarImage(
        req.files.avatar.tempFilePath,
        user.avatarId
      );

      if (user.email === email) {
        return res.status(404).json(`the email ${email} is repeat`);
      }
      if (findUser) {
        return res.status(400).json(`the email ${email} is registered`);
      } else {
        let userUpdate = await user.update({
          avatar: avatarUpdate.secure_url,
          avatarId: avatarUpdate.public_id,
          email: email,
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

      let findUser = await Users.findOne({ where: { email } });

      if (user.email === email) {
        return res.status(404).json(`the email ${email} is repeat`);
      }

      if (findUser) {
        return res.status(400).json(`the email ${email} is registered`);
      } else {
        let userUpdate = await user.update({
          email: email,
          city: city,
          country: country,
          phone: phone,
        });

        res.status(200).json({ ...userUpdate.dataValues });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
async function pageCurrentOne(req, res) {
  let { id } = req.params;
  console.log(id);
  if (id === "0") {
    try {
      const findUsers = await Users.findAll({
        where: { status: { [Op.eq]: 1 } },
      });
      const pages = Math.ceil(findUsers.length / 10);
      return res.status(200).json({ status: "success", pages });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ status: "error", e });
    }
  } else {
    let SelectedP = []; 
    itemsPage = parseInt(id);

    let EndCursor = itemsPage * 10;
    let StartCursor = EndCursor - 10; 
    try {
      let Usuarios = await Users.findAll({
        where: { status: { [Op.eq]: 1 } },
        include:[ {
          model: Roles,
          attributes: ["rol"],
        },],
      }); 
      
const userArray=Usuarios;
      SelectedP = userArray.slice(StartCursor, EndCursor); 
      res.status(200).json(SelectedP); 
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}

async function pageCurrentCero(req, res) {
  let { id } = req.params;
  console.log(id);
  if (id === "0") {
    try {
      const findUsers = await Users.findAll({
        where: { status: { [Op.eq]: 0 } },
      });
      const pages = Math.ceil(findUsers.length / 10);
      return res.status(200).json({ status: "success", pages });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ status: "error", e });
    }
  } else {
    let SelectedP = []; 
    itemsPage = parseInt(id);

    let EndCursor = itemsPage * 10;
    let StartCursor = EndCursor - 10; 
    try {
      let Usuarios = await Users.findAll({
        where: { status: { [Op.eq]: 0 } },
        include:[ {
          model: Roles,
          attributes: ["rol"],
        },],
      }); 
      
const userArray=Usuarios;
      SelectedP = userArray.slice(StartCursor, EndCursor); 
      res.status(200).json(SelectedP); 
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}

module.exports = {
  allUsers,
  oneUser,
  statusCero,
  updateUser,
  deleteUser,
  restoreUser,
  pageCurrentOne,
  pageCurrentCero,
};
