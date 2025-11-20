const matieres = require("../models/Matiere.js");

class MatiereRepository {
  getAll() {
    return matieres;
  }

  getById(id) {
    return matieres.find(m => m.id === id);
  }

  create(matiere) {
    matiere.id = matieres.length ? matieres[matieres.length - 1].id + 1 : 1;
    matieres.push(matiere);
    return matiere;
  }

  update(id, updatedMatiere) {
    const index = matieres.findIndex(m => m.id === id);
    if (index !== -1) {
      matieres[index] = { id, ...updatedMatiere };
      return matieres[index];
    }
    return null;
  }

  delete(id) {
    const index = matieres.findIndex(m => m.id === id);
    if (index !== -1) return matieres.splice(index, 1)[0];
    return null;
  }
}

module.exports = new MatiereRepository();
