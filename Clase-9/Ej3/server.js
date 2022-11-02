const express = require("express");
const handlebars = require("express-handlebars");
const app = express();

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultlayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials/",
  })
);
app.set("views engine", "hbs");
app.set("views", "./views");
app.use(express.static("public"));
fakeApi = () => {
  [
    { name: "Katarina", lane: "midlaner" },
    { name: "Jayce", lane: "toplaner" },
    { name: "Heimerdinger", lane: "toplaner" },
    { name: "Jayce", lane: "midlaner" },
    { name: "Azir", lane: "midlaner" },
  ];
};

app.get("/", (req, res) => {
  res.render("main.hbs", { suggestedChamps: fakeApi(), listExists: true });
});
const PORT = 8080;
app.listen(PORT, (err) => {
  if (err) throw new Error(`Error en servidor ${err}`);
  console.log(`El servidor express escuchando en el puerto ${PORT}`);
});
