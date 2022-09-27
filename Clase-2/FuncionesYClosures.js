//! Primer Punto
function mostrarLista(lista) {
  if (lista.length == 0) {
    console.log("lista vacia");
  } else {
    for (let i = 0; i < lista.length; i++) {
      console.log(lista[i]);
    }
  }
}
let lista = [];
mostrarLista(lista);

//! Segundo Punto
let lista1 = ["Miguel", 3, null];
let lista2 = ["Angel", 29, true];
(function (lista) {
  if (lista.length == 0) {
    console.log("lista vacia");
  } else {
    for (let i = 0; i < lista.length; i++) {
      console.log(lista[i]);
    }
  }
})(lista2);

//! Tercer Punto
function crearMultiplicador(a) {
  return function (b) {
    console.log(`resultado: ${a * b}`);
  };
}
let result = crearMultiplicador(1);
let duplicar = crearMultiplicador(2);
let triplicar = crearMultiplicador(3);
result(2);
duplicar(3);
triplicar(3);
