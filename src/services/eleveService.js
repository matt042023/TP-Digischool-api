const Eleve = require("../models/Eleve");

exports.getAll = async () => {
  return await Eleve.find();
};

exports.getOne = async (id) => {
  const eleve = await Eleve.findById(id);
  if (!eleve) {
    throw new Error("Élève introuvable");
  }
  return eleve;
};

exports.create = async (data) => {
  if (!data.nom || !data.sexe || !data.classe) {
    throw new Error("Les champs 'nom', 'sexe' et 'classe' sont obligatoires");
  }
  return await Eleve.create(data);
};

exports.update = async (id, data) => {
  const updated = await Eleve.findByIdAndUpdate(id, data, { new: true });
  if (!updated) {
    throw new Error("Impossible de mettre à jour cet élève");
  }
  return updated;
};

exports.remove = async (id) => {
  const deleted = await Eleve.findByIdAndDelete(id);
  if (!deleted) {
    throw new Error("Impossible de supprimer cet élève");
  }
  return deleted;
};
