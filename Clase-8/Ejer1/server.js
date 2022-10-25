const express = require("express");
const { Router } = express;

const app = express();
const routerPersonas = Router();
const routerMascotas = Router();

let personas = [{ nombre: "juan", apellido: "Perez", edad: 21 }];
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/personas", routerPersonas);
app.use(express.static(path.jois(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("index.html");
});
routerPersonas.get("/", (req, res) => {
  res.json(personas);
});
routerPersonas.post("/", (req, res) => {
  personas.push(req.body);
  res.json(personas);
});

let mascotas = [{ nombre: "Kaysa", Raza: "Maltese", edad: 3 }];
app.use("/mascotas", routerMascotas);
routerMascotas.get("/", (req, res) => {
  res.json(mascotas);
});
routerMascotas.post("/", (req, res) => {
  mascotas.push(req.body);
  res.json(mascotas);
});


app.listen(8080, () => {
  console.log("Server Running");
});
