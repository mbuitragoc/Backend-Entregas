const express = require("express");
const { Router } = express;
const fs = require("fs");
const path = require("path");
const exphbs = require("express-handlebars");

const app = express();

const handlebarsConfig = {
  extname: ".hbs",
  defaultLayout: "index.hbs",
  layoutDir: __dirname + "/views/layouts",
  partialsDir: __dirname + "/views/partials",
};

app.engine("hbs", exphbs.engine(handlebarsConfig));

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routerApi = Router();

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

class Contenedor {
  constructor(fileName) {
    this.file = fileName;
  }

  save = async (prod) => {
    try {
      if (fs.existsSync(this.file)) {
        const prodArr = await this.getAll();
        const lastId = prodArr.reduce(
          (acc, item) => (item.id > acc ? (acc = item.id) : acc),
          0
        );
        const newProd = {
          id: lastId + 1,
          ...prod,
        };
        prodArr.push(newProd);
        await fs.promises.writeFile(
          this.file,
          JSON.stringify(prodArr, null, 2)
        );
      } else {
        let newProd = {
          id: 1,
          ...prod,
        };
        await fs.promises.writeFile(
          this.file,
          JSON.stringify([newProd], null, 2)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  getById = async (id) => {
    // Recibe Id y devuelve el objeto con ese id, o null si no esta
    try {
      if (fs.existsSync(this.file)) {
        const products = await this.getAll();
        const prod = products.find((item) => item.id === id);
        return prod;
      }
    } catch (error) {
      console.log(error);
    }
  };

  updateById = async (id, prod) => {
    try {
      const products = await this.getAll();
      const index = products.findIndex((e) => e.id === id);
      const product = products.find((e) => e.id === id);
      product.title = prod.title;
      product.price = prod.price;
      product.thumbnail = prod.thumbnail;
      products[index] = product;
      await fs.promises.writeFile(this.file, JSON.stringify(products, null, 2));
    } catch (error) {
      console.log(error);
    }
  };

  getAll = async () => {
    // Devuelve un array con los objetos presentes en el archivo
    try {
      const cont = await fs.promises.readFile(this.file, "utf8");
      const prod = JSON.parse(cont);
      return prod;
    } catch (error) {
      console.log(error);
    }
  };

  deleteById = async (id) => {
    // Elimina del archivo el objeto con el id buscado
    try {
      const products = await this.getAll();
      const newProds = products.filter((item) => item.id !== id);
      await fs.promises.writeFile(this.file, JSON.stringify(newProds, null, 2));
    } catch (error) {
      console.log(error);
    }
  };

  deleteAll = async () => {
    // Elimina todos los objetos del archivo
    try {
      await fs.promises.writeFile(this.file, JSON.stringify([]));
    } catch (error) {
      console.log(error);
    }
  };
}

const Producto = new Contenedor("productos.txt");

app.use("/api", routerApi);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("main");
});

app.get("/productos", async (req, res) => {
  const products = await Producto.getAll();
  res.render("products", { productos: products });
});

routerApi.get("/productos", async (req, res) => {
  const products = await Producto.getAll();
  res.json(products);
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
