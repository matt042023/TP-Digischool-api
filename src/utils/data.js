// src/utils/data.js

// Données d'exemple pour les élèves
const eleves = [
  {
    id: 1,
    nom: "Durand",
    prenom: "Marie",
    classe: 1,
    dateNaissance: "2015-01-02",
    adresse: "15 rue du Lac 75001 Paris",
    sexe: "FEMME",
  },
  {
    id: 2,
    nom: "Dupond",
    prenom: "Pierre",
    classe: 2,
    dateNaissance: "2014-04-08",
    adresse: "15 rue du Lac 75001 Paris",
    sexe: "HOMME",
  },
];

// Données d'exemple pour les professeurs
const professeurs = [
  {
    id: 1,
    nom: "GERMAIN",
    prenom: "Christophe",
    dateNaissance: "1971-01-02",
    adresse: "15 rue du printemps 59000 LILLE",
    sexe: "HOMME",
  },
  {
    id: 2,
    nom: "LOUREIRO",
    prenom: "Julie",
    dateNaissance: "1982-01-08",
    adresse: "72 av. Matignon 75003 Paris",
    sexe: "FEMME",
  },
];

module.exports = {
  eleves,
  professeurs,
};
