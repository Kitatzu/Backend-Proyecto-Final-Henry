const { Message } = require("../db.js");

const createMessage = async (req, res) => {
  
  try {
    const { message } = req.body;
  const time = new Date();
    const chatMessage = await Message.create({ message, time });
    res.json({ chatMessage });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

module.exports =createMessage;