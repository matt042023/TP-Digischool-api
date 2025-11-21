const Matiere = require("../models/Matiere.js");

class MatiereRepository {
  async getAll() {
    return await Matiere.find();
  }

  async getById(id) {
    return await Matiere.findById(id);
  }

  async create(matiereData) {
    const matiere = new Matiere(matiereData);
    return await matiere.save();
  }

  async update(id, updateData) {
    return await Matiere.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await Matiere.findByIdAndDelete(id);
  }
}

module.exports = new MatiereRepository();