const express = require("express");
const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/datos", (req, res) => {
  res.render("nivel", req.query);
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));
