const ClasseRepository = require("../repositories/classeRepository.js");

class ClasseService {
  getAllClasses() {
    return ClasseRepository.getAll();
  }

  getClasseById(id) {
    const classe = ClasseRepository.getById(id);
    if (!classe) throw new Error("Classe non trouvée");
    return classe;
  }

  createClasse(data) {
    // vérifier qu'une classe avec le même nom n'existe pas
    const exists = ClasseRepository.getAll().some(c => c.nom === data.nom);
    if (exists) throw new Error("Une classe avec ce nom existe déjà");
    return ClasseRepository.create(data);
  }

  updateClasse(id, data) {
    const updated = ClasseRepository.update(id, data);
    if (!updated) throw new Error("Impossible de mettre à jour : classe non trouvée");
    return updated;
  }

  deleteClasse(id) {
    const deleted = ClasseRepository.delete(id);
    if (!deleted) throw new Error("Impossible de supprimer : classe non trouvée");
    return deleted;
  }
}

module.exports = new ClasseService();
