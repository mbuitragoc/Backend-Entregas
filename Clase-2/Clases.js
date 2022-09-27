// ! Declaracion de clases
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  static saludoCorto = "hola";

  saludoCompleto() {
    console.log(`buenas, soy ${nombre}`);
  }

  saludoEstatico() {
    console.log(Persona.saludoCorto);
  }
}

// ! Ejercicio 1
class contador {
  constructor(nombre) {
    this.nombre = nombre;
  }
}
