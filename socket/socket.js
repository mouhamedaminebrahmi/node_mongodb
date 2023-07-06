const Events = require("./socket-event");

let users = [];
/**
 * If the userId doesn't already exist in the users array, add it
 * @param userId - The user's id
 * @param socketId - The socket id of the user
 */
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};
/**
 * It removes a user from the users array by filtering out the user whose socketId matches the socketId
 * passed in as an argument.
 * @param socketId - The socket id of the user to remove.
 */
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
/**
 * It returns the user object from the users array that has a userId property that matches the userId
 * argument.
 * @param userId - The userId of the user you want to get.
 * @returns The result of the find function.
 */
const getUser = (userId) => {
  const result = users.find((user) => user.userId == userId);
  return result;
};

module.exports = {
  __init__: () => {
    io.on("connection", (socket) => {
      console.log("a user connected : socketid : " + socket.id);
      //take userId and socketId from user
      socket.on(Events.ADD_USER, (userId) => {
        addUser(userId, socket.id);
        io.emit(Events.GET_USERS, users);
      });

      //send and get message
      socket.on(Events.SEND_MESSAGE, ({ senderId, receiverId, text, file }) => {
        const user = getUser(receiverId);
        if (user) {
          io.to(user.socketId).emit(Events.GET_MESSAGE, {
            senderId,
            text,
            file,
          });
        }
      });

      //keyboard typing
      socket.on(Events.IS_TYPING, (userId) => {
        const user = getUser(userId);
        if (user) {
          io.to(user.socketId).emit(Events.GET_TYPING, true);
        }
      });

      //keyboard stop styping
      socket.on(Events.STOP_TYPING, (userId) => {
        const user = getUser(userId);
        if (user) {
          io.to(user.socketId).emit(Events.GET_TYPING, false);
        }
      });

      //socket disconnect
      socket.on("disconnect", () => {
        console.log("a user disconnect : socketid : " + socket.id);
        removeUser(socket.id);
        io.emit(Events.GET_USERS, users);
      });
    });
  },
};
