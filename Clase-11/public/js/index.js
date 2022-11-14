const socket = io.connect();

const input = document.querySelector("input");

const button = document.querySelector("button");

button.addEventListener("click", () => {
  socket.emit("mensaje", input.value);
});

socket.on("mensajes", (data) => {
  document.querySelector("p").innerText = data;
});
