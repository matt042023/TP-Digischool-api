const Classe = require("../models/Classe.js");

class ClasseRepository {
  // Récupérer toutes les classes
  async getAll() {
    return await Classe.find();
  }

  // Récupérer une classe par son id
  async getById(id) {
    return await Classe.findById(id);
  }

  // Créer une nouvelle classe
  async create(classeData) {
    const classe = new Classe(classeData);
    return await classe.save();
  }

  // Mettre à jour une classe
  async update(id, updateData) {
    return await Classe.findByIdAndUpdate(id, updateData, { new: true });
  }

  // Supprimer une classe
  async delete(id) {
    return await Classe.findByIdAndDelete(id);
  }
}

module.exports = new ClasseRepository();
