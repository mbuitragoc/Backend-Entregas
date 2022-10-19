const Interval = setInterval(mostrarLetras("¡Hola!"), 500);

function detener() {
  clearInterval(Interval);
}

function mostrarLetras(word) {
  let letras = word.split("");
  letras.forEach((letra) => {
    console.log(letra);
  });
  detener();
}
