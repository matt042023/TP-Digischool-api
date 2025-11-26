const ProfesseurRepository = require("../repositories/professeurRepository");

class ProfesseurService {
  async getAll() {
    return await ProfesseurRepository.findAll();
  }

  async getById(id) {
    const prof = await ProfesseurRepository.findById(id);
    if (!prof) {
      throw new Error("Professeur introuvable");
    }
    return prof;
  }

  async create(data) {
    if (!data.nom || !data.sexe) {
      throw new Error("Les champs 'nom' et 'sexe' sont obligatoires");
    }
    return await ProfesseurRepository.create(data);
  }

  async update(id, data) {
    const updated = await ProfesseurRepository.update(id, data);
    if (!updated) {
      throw new Error("Impossible de mettre à jour ce professeur");
    }
    return updated;
  }

  async delete(id) {
    const deleted = await ProfesseurRepository.remove(id);
    if (!deleted) {
      throw new Error("Impossible de supprimer ce professeur");
    }
    return deleted;
  }
}

module.exports = new ProfesseurService();
