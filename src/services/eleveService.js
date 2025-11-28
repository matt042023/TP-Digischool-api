const EleveRepository = require("../repositories/eleveRepository");

class EleveService {
  async getAll() {
    return await EleveRepository.findAll();
  }

  async getById(id) {
    const eleve = await EleveRepository.findById(id);
    if (!eleve) {
      throw new Error("Élève introuvable");
    }
    return eleve;
  }

  async create(data) {
    if (!data.nom || !data.sexe || !data.classe) {
      throw new Error("Les champs 'nom', 'sexe' et 'classe' sont obligatoires");
    }
    return await EleveRepository.create(data);
  }

  async update(id, data) {
    const updated = await EleveRepository.update(id, data);
    if (!updated) {
      throw new Error("Impossible de mettre à jour cet élève");
    }
    return updated;
  }

  async delete(id) {
    const deleted = await EleveRepository.remove(id);
    if (!deleted) {
      throw new Error("Impossible de supprimer cet élève");
    }
    return deleted;
  }

  async getByClasse(classeId) {
  const result = await EleveRepository.findByClasse(classeId);
  return result; // tableau vide possible -> pas d'exception
}

}

module.exports = new EleveService();
