const { Users } = require("../db.js");

async function allUsers(req, res) {
  let { userName } = req.query;

  if (userName) {
    try {
      let findUser = await Users.findAll({
        where: { userName },
      });

      findUser
        ? res.status(201).json({ ...findUser[0].dataValue })
        : res.status(400).json("user not found");
    } catch (error) {
      res.status(400).json({ message: error });
    }
  } else {
    try {
      let allUsers = await Users.findAll();

      res.status(200).json(allUsers);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}

module.exports = { allUsers };
