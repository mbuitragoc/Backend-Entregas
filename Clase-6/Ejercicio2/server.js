const { json } = require("body-parser");
const express = require("express");

const server = express();

server.get("/", (req, res) => {
  let msg = `Bienvenidos al servidor express`;
  res.send(`<h1>${msg}</h1>`);
});

let visitas = 0;
server.get("/visitas", (req, res) => {
  visitas++;
  res.send(`El numero de visitas a la pagina es de: ${visitas}`);
});

server.get("/fyh", (req, res) => {
  let data = { fyh: new Date().toLocaleString() };
  res.send(`${JSON.stringify(data)}`);
});

server.listen(8080, () => {
  console.log("listening on Port 8080");
});
