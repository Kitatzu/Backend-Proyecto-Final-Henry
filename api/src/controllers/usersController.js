const { Users, Roles } = require("../db.js");
const nodemailer = require('nodemailer');

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


async function boxSend (req, res) {
  let { correo } = req.body;
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "valcoellar@gmail.com", 
    pass: "rnrlnllvfcbjcvsf", 
  },
  });  

// messages ----------------------

let accion = 'exito';
if (accion == "exito"){
  let info = await transporter.sendMail({
    from: '"Boxtech" <account@boxtech.com>', 
    to: correo, // receivers
    subject: "Boxtech", // Subject line
    text: "Thank you for your purchase!!", // plain text body
    html: "<b>Thank you for your purchase!!</b>", // html body
  });
}


}










module.exports = { allUsers, boxSend };
