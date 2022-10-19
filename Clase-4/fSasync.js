const fs = require("fs");

fs.readFile("package.json", (error, contenido) => {
  if (error) {
    console.log("No se puede leer");
    console.error(error);
  } else {
    data = JSON.parse(contenido);
    size = Buffer.from(contenido).length;
    const info = {
      contenidoStr: data,
      contenidoObj: contenido,
      size: size,
    };
    console.log(info);
    infoString = JSON.stringify(info, null, 2);
    fs.writeFile("info.txt", infoString, (error) => {
      if (error) {
        console.log("No se puede guardar");
        console.log(error);
      } else {
        console.log("Guardado");
      }
    });
  }
});
