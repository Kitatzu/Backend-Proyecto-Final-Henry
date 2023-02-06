const { Messages, Users } = require("../db.js");

const createMessage = async (userName, messageContent) => {
  console.log(messageContent)
  const {content} = messageContent
  try {
    const message = await Messages.create({
      content,
    });
    let user = await Users.findAll({
      where: {
        userName: userName,
      },
    });
    message.addUsers(user);
  
    return {
      userName: userName,
      message: message.content,
    };
  } catch (error) {
    console.log(error)
  }
};

const getMessages = async () => {
  try {
    const messages = await Messages.findAll({
      include: {
        model: Users,
        attributes: ["userName"],
        },
    });
    return messages
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createMessage, getMessages };
