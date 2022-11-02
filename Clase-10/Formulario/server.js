const express = require("express");
const app = express();

let personas = [];

app.use(express.urlencoded({ extended: true }));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("formulario", { personas });
});

app.get("/datos", (req, res) => {
  res.render("nivel", req.query);
});

app.post("/datos", (req, res) => {
  personas.push(req.body);
  console.log(personas);
  res.redirect("/");
});

const PORT = 8080;
app
  .listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`))
  .on("error", (error) => console.log(`Error en servidor ${error}`));
