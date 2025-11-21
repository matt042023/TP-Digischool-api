const Professeur = require("../models/Professeur");

exports.getAll = async () => {
  return await Professeur.find();
};

exports.getOne = async (id) => {
  const prof = await Professeur.findById(id);
  if (!prof) {
    throw new Error("Professeur introuvable");
  }
  return prof;
};

exports.create = async (data) => {
  if (!data.nom || !data.sexe) {
    throw new Error("Les champs 'nom' et 'sexe' sont obligatoires");
  }
  return await Professeur.create(data);
};

exports.update = async (id, data) => {
  const updated = await Professeur.findByIdAndUpdate(id, data, { new: true });
  if (!updated) {
    throw new Error("Impossible de mettre à jour ce professeur");
  }
  return updated;
};

exports.remove = async (id) => {
  const deleted = await Professeur.findByIdAndDelete(id);
  if (!deleted) {
    throw new Error("Impossible de supprimer ce professeur");
  }
  return deleted;
};
