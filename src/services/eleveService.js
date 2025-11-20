const repository = require("../repositories/eleveRepository");

exports.getAll = () => {
  return repository.findAll();
};

exports.getOne = (id) => {
  const eleve = repository.findById(id);
  if (!eleve) {
    throw new Error("Élève introuvable");
  }
  return eleve;
};

exports.create = (data) => {
  if (!data.nom || !data.sexe || !data.classe) {
    throw new Error("Les champs 'nom', 'sexe' et 'classe' sont obligatoires");
  }
  return repository.create(data);
};

exports.update = (id, data) => {
  const updated = repository.update(id, data);
  if (!updated) {
    throw new Error("Impossible de mettre à jour cet élève");
  }
  return updated;
};

exports.remove = (id) => {
  const deleted = repository.remove(id);
  if (!deleted) {
    throw new Error("Impossible de supprimer cet élève");
  }
  return deleted;
};
