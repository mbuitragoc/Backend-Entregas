const fs = require("fs");
const data = fs.readFileSync("./test_input.txt", "utf-8");
console.log(data);
fs.writeFileSync(
  "./test_output.txt",
  "Esto es la prueba de escritura\n",
  "utf-8"
);
fs.appendFileSync(
  "./test_output.txt",
  "Esto es un Agregado\n",
  "utf-8"
);
// fs.unlinkSync("./test_output.txt")
