const { Messages, Users } = require("../db.js");

const createMessage = async (userId, messageContent) => {
  const user = await Users.findByPk(userId);
  const message = await Messages.create({
    content: messageContent,
    userId: user.id,
  });

  return {
    userName: user.userName,
    message: message.content,
  };
};

const getMessages = async () => {
  try {
    const messages = await Messages.findAll({
      include: [
        {
          model: Users,
          as: "user",
        },
      ],
    });

    return messages.map((message) => {
      console.log(message);
      return {
                userName: message.user.userName,
        message: message.content,
      };
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createMessage, getMessages };
