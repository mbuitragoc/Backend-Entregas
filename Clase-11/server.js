const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));

mensajes = [];

io.on("connection", (socket) => {
  console.log("Nuevo Cliente conectado!");

  socket.emit("mensajes", mensaje);

  socket.on("mensaje", (data) => {
    mensajes.push({ socketid: socket.id, mensaje: data });
    io.emit("mensajes", mensajes);
  });
});

const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor Http con Websockets escuchando en el puerto ${
      connectedServer.address().port
    }`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);
