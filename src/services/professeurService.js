const repository = require("../repositories/professeurRepository");

exports.getAll = () => {
  return repository.findAll();
};

exports.getOne = (id) => {
  const prof = repository.findById(id);
  if (!prof) {
    throw new Error("Professeur introuvable");
  }
  return prof;
};

exports.create = (data) => {
  if (!data.nom || !data.sexe) {
    throw new Error("Les champs 'nom' et 'sexe' sont obligatoires");
  }
  return repository.create(data);
};

exports.update = (id, data) => {
  const updated = repository.update(id, data);
  if (!updated) {
    throw new Error("Impossible de mettre à jour ce professeur");
  }
  return updated;
};

exports.remove = (id) => {
  const deleted = repository.remove(id);
  if (!deleted) {
    throw new Error("Impossible de supprimer ce professeur");
  }
  return deleted;
};
