const classes = require("../models/Classe.js");

class ClasseRepository {
  getAll() {
    return classes;
  }

  getById(id) {
    return classes.find(c => c.id === id);
  }

  create(classe) {
    classe.id = classes.length ? classes[classes.length - 1].id + 1 : 1;
    classes.push(classe);
    return classe;
  }

  update(id, updatedClasse) {
    const index = classes.findIndex(c => c.id === id);
    if (index !== -1) {
      classes[index] = { id, ...updatedClasse };
      return classes[index];
    }
    return null;
  }

  delete(id) {
    const index = classes.findIndex(c => c.id === id);
    if (index !== -1) return classes.splice(index, 1)[0];
    return null;
  }
}

module.exports = new ClasseRepository();
