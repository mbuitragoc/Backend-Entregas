class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    (this.nombre = nombre),
      (this.apellido = apellido),
      (this.libros = libros),
      (this.mascotas = mascotas);
  }

  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }

  addMascota(mascota) {
    this.mascotas.push(mascota);
  }

  countMascotas() {
    return this.mascotas.length;
  }

  addBook(nombre, autor) {
    this.libros.push({ nombre: nombre, autor: autor });
  }

  getBookNames() {
    return this.libros.map((elem) => elem.nombre);
  }
}

let pedro = new Usuario("Pedro", "Perez", [], ["Zaphi", "Don Gato", "Nala"]);
pedro.addMascota("Kaysa");
pedro.addBook("One Piece 93", "Oda");
pedro.addBook("One Punch", "One");
console.log(pedro);
console.log(pedro.getFullName());
console.log(pedro.countMascotas());
console.log(pedro.getBookNames());