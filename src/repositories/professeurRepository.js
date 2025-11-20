const { professeurs } = require("../utils/data");

let nextProfId = professeurs.length
  ? Math.max(...professeurs.map((p) => p.id)) + 1
  : 1;

exports.findAll = () => {
  return professeurs;
};

exports.findById = (id) => {
  return professeurs.find((p) => p.id === Number(id)) || null;
};

exports.create = (data) => {
  const newProf = {
    id: nextProfId++,
    nom: data.nom,
    prenom: data.prenom || "",
    dateNaissance: data.dateNaissance || null,
    adresse: data.adresse || "",
    sexe: data.sexe,
  };
  professeurs.push(newProf);
  return newProf;
};

exports.update = (id, data) => {
  const index = professeurs.findIndex((p) => p.id === Number(id));
  if (index === -1) return null;

  professeurs[index] = {
    ...professeurs[index],
    ...data,
    id: professeurs[index].id,
  };

  return professeurs[index];
};

exports.remove = (id) => {
  const index = professeurs.findIndex((p) => p.id === Number(id));
  if (index === -1) return null;

  const deleted = professeurs[index];
  professeurs.splice(index, 1);
  return deleted;
};
