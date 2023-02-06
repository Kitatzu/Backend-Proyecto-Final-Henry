const { Messages, Users } = require("../db.js");

const createMessage = async (userName, messageContent) => {
  console.log("messagemessageContent");
  //TODO: LA FUNCION QUE SE DEBE USAR PARA MESSAGE ES SETUSER, AUN ASI SETEAMOS EL USERID
  //FIXME: REVISAR NOMBRES DE LAS PROPIEDADES PARA MAPEAR EN EL FRONT
  //FIXME: LAS PROPIEDADES QUE LLEGAN EN EL BACK ES EL OBJETO {user,content,avatar} y solo se retorna el user y el content OJO , en el front se reciven datos con propiedades diferentes.
  try {
    const user = await Users.findOne({
      where: {
        userName: userName,
      },
    });
    console.log(user);
    const message = await Messages.create({
      content: messageContent,
      userId: user.id,
    });

    //FIXME: NO EXISTE FUNCION
    // await user.addMessags(message);

    return {
      userName: userName,
      message: message.content,
    };
  } catch (error) {
    console.log(error);
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
    return messages;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createMessage, getMessages };
