const fs = require("fs");

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

module.exports = Contenedor;
