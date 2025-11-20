const MatiereRepository = require("../repositories/matiereRepository.js");

class MatiereService {
  getAllMatieres() {
    return MatiereRepository.getAll();
  }

  getMatiereById(id) {
    const matiere = MatiereRepository.getById(id);
    if (!matiere) throw new Error("Matière non trouvée");
    return matiere;
  }

  createMatiere(data) {
    const exists = MatiereRepository.getAll().some(m => m.nom === data.nom);
    if (exists) throw new Error("Une matière avec ce nom existe déjà");
    return MatiereRepository.create(data);
  }

  updateMatiere(id, data) {
    const updated = MatiereRepository.update(id, data);
    if (!updated) throw new Error("Impossible de mettre à jour : matière non trouvée");
    return updated;
  }

  deleteMatiere(id) {
    const deleted = MatiereRepository.delete(id);
    if (!deleted) throw new Error("Impossible de supprimer : matière non trouvée");
    return deleted;
  }
}

module.exports = new MatiereService();
