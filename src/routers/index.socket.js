import { socketServer } from "../../server.js";

let allMessages = [];

const socketCb = (socket) => {
  // Emitir los últimos 10 mensajes al usuario que se conecta
  socket.emit("all messages", [...allMessages].reverse().slice(0, 10).reverse());

  // Cuando se recibe un nuevo mensaje
  socket.on("new message", (data) => {
    const formattedMessage = {
      username: data.username,
      message: data.message,
    };
    allMessages.push(formattedMessage); // Almacenar el mensaje con el nombre de usuario
    // Emitir a todos los clientes conectados
    socketServer.emit("all messages", [...allMessages].reverse().slice(0, 10).reverse());
  });
};

export default socketCb;
