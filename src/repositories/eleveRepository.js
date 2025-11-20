const eleves = require("../models/Eleve");

let nextEleveId = eleves.length ? Math.max(...eleves.map((e) => e.id)) + 1 : 1;

exports.findAll = () => {
  return eleves;
};

exports.findById = (id) => {
  return eleves.find((e) => e.id === Number(id)) || null;
};

exports.create = (data) => {
  const newEleve = {
    id: nextEleveId++,
    nom: data.nom,
    prenom: data.prenom || "",
    classe: data.classe || null,
    dateNaissance: data.dateNaissance || null,
    adresse: data.adresse || "",
    sexe: data.sexe,
  };
  eleves.push(newEleve);
  return newEleve;
};

exports.update = (id, data) => {
  const index = eleves.findIndex((e) => e.id === Number(id));
  if (index === -1) return null;

  eleves[index] = {
    ...eleves[index],
    ...data,
    id: eleves[index].id, // on ne modifie pas l'id
  };

  return eleves[index];
};

exports.remove = (id) => {
  const index = eleves.findIndex((e) => e.id === Number(id));
  if (index === -1) return null;

  const deleted = eleves[index];
  eleves.splice(index, 1);
  return deleted;
};
