const express = require("express");
const { Router } = express;
const path = require("path");
const Contenedor = require("./Contenedor");
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routerApi = Router();

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

const Producto = new Contenedor("productos.txt");

app.use("/api", routerApi);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("form");
});

app.get("/productos", async (req, res) => {
  const products = await Producto.getAll();
  res.render("products", { productos: products });
});

routerApi.get("/productos", async (req, res) => {
  const products = await Producto.getAll();
  res.render("products", { productos: products });
});

routerApi.get("/productos/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  const products = await Producto.getById(id);
  if (products) {
    res.json(products);
  } else {
    res.json({ error: "producto no encontrado" });
  }
});

routerApi.delete("/productos/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  const products = await Producto.getById(id);
  if (products) {
    await Producto.deleteById(id);
    res.json(await Producto.getAll());
  } else {
    res.json({ error: "producto no encontrado" });
  }
});

routerApi.post("/productos", async (req, res) => {
  await Producto.save(req.body);
});

routerApi.put("/productos/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  const product = await Producto.getById(id);
  const products = await Producto.getAll();
  if (product) {
    prod = req.body;
    await Producto.updateById(id, prod);
    res.json(products);
  } else {
    res.json({ error: "producto no encontrado" });
  }
});
