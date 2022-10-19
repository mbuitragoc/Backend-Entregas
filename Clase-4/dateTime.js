const fs = require("fs");
const date = new Date();
fs.writeFileSync("./fyh.txt", date.toString());
try {
  let datos = fs.readFileSync("./fyh.txt", "utf-8");
  console.log(datos)
} catch (error) {
  console.log("No hay ningun valor")
}
