const { Users } = require("../db.js");

async function login(req, res) {
  let { email, password } = req.body;

  try {
    let validEmail = await Users.findOne({ where: { email } });
    if (!validEmail)
      return res.status(400).json({ error: "email is not registered" });

    let validPassword = await Users.findOne({ where: { password } });
    if (!validPassword)
      return res.status(400).json({ error: "password incorrect" });

    res
      .status(200)
      .json({ meesage: "Correctly Login", ...validEmail.dataValues });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

module.exports = { login };
