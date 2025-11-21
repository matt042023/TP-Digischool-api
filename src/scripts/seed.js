require("dotenv").config();
const mongoose = require("mongoose");

// Import des modèles
const Professeur = require("../models/Professeur");
//const Classe = require("../models/Classe");
const Eleve = require("../models/Eleve");
//const Matiere = require("../models/Matiere");
//const Trimestre = require("../models/Trimestre");
//const Note = require("../models/Note");

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("⚡ Connecté à MongoDB");

    // Nettoyage des collections
    await Promise.all([
      Professeur.deleteMany({}),
      //Classe.deleteMany({}),
      Eleve.deleteMany({}),
      //Matiere.deleteMany({}),
      //Trimestre.deleteMany({}),
      //Note.deleteMany({}),
    ]);
    console.log("🧹 Collections nettoyées");

    // 1. Professeurs
    const professeurs = await Professeur.insertMany([
      {
        nom: "GERMAIN",
        prenom: "Christophe",
        date_naissance: new Date("1971-01-02"),
        adresse: "15 rue du printemps 59000 LILLE",
        sexe: "HOMME",
      },
      {
        nom: "LOUREIRO",
        prenom: "Julie",
        date_naissance: new Date("1982-01-08"),
        adresse: "72 av. Matigon 75003 Paris",
        sexe: "FEMME",
      },
      {
        nom: "SIMON",
        prenom: "Jean",
        date_naissance: new Date("1992-01-17"),
        adresse: "2 rue du Moulin 92230 Neullavy",
        sexe: "HOMME",
      },
    ]);
    console.log(`✅ ${professeurs.length} professeurs insérés`);

    // 2. Classes
    // const classes = await Classe.insertMany([
    //   { _id: 1, nom: "CP", prof: 1 },
    //   { _id: 2, nom: "CE1", prof: 2 },
    //   { _id: 3, nom: "CE2", prof: 2 },
    //   { _id: 4, nom: "CM1", prof: 3 },
    //   { _id: 5, nom: "CM2", prof: 3 },
    // ]);
    // console.log(`✅ ${classes.length} classes insérées`);

    // 3. Élèves
    const eleves = await Eleve.insertMany([
      {
        // _id: 1,
        nom: "Durand",
        prenom: "Marie",
        classe: 1,
        date_naissance: new Date("2015-01-02"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "FEMME",
      },
      {
        // _id: 2,
        nom: "Alesi",
        prenom: "Julie",
        classe: 1,
        date_naissance: new Date("2014-01-08"),
        adresse: "72 av. Jean Dupont 75003 Paris",
        sexe: "FEMME",
      },
      {
        // _id: 3,
        nom: "Martini",
        prenom: "Carine",
        classe: 5,
        date_naissance: new Date("2008-01-17"),
        adresse: "2 rue du Moulin 92230 Neullavy",
        sexe: "FEMME",
      },
      {
        // _id: 4,
        nom: "Varola",
        prenom: "Sophie",
        classe: 5,
        date_naissance: new Date("2009-01-21"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "FEMME",
      },
      {
        // _id: 5,
        nom: "Labiche",
        prenom: "Lelou",
        classe: 5,
        date_naissance: new Date("2009-01-21"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "FEMME",
      },
      {
        // _id: 6,
        nom: "Dujardin",
        prenom: "Anne",
        classe: 5,
        date_naissance: new Date("2008-02-03"),
        adresse: "67 rue des Jardins 91800 Brunoy",
        sexe: "FEMME",
      },
      {
        // _id: 7,
        nom: "Laventure",
        prenom: "Martine",
        classe: 5,
        date_naissance: new Date("2009-02-15"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "FEMME",
      },
      {
        // _id: 8,
        nom: "Livradu",
        prenom: "Alice",
        classe: 5,
        date_naissance: new Date("2008-02-18"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "FEMME",
      },
      {
        // _id: 9,
        nom: "Veronicci",
        prenom: "Cerise",
        classe: 5,
        date_naissance: new Date("2008-03-01"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "FEMME",
      },
      {
        // _id: 10,
        nom: "Baladini",
        prenom: "Mathilde",
        classe: 5,
        date_naissance: new Date("2009-03-12"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "FEMME",
      },
      {
        // _id: 11,
        nom: "Michelet",
        prenom: "Jean",
        classe: 2,
        date_naissance: new Date("2013-04-08"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 12,
        nom: "Dupond",
        prenom: "Pierre",
        classe: 2,
        date_naissance: new Date("2013-04-09"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 13,
        nom: "Timberot",
        prenom: "Martin",
        classe: 3,
        date_naissance: new Date("2011-04-14"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 14,
        nom: "Gravatas",
        prenom: "Paul",
        classe: 3,
        date_naissance: new Date("2011-04-15"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 15,
        nom: "De La Grange",
        prenom: "Luc",
        classe: 5,
        date_naissance: new Date("2008-04-16"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 16,
        nom: "Millot",
        prenom: "Bertrand",
        classe: 5,
        date_naissance: new Date("2009-04-20"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 17,
        nom: "Herbert",
        prenom: "Franck",
        classe: 4,
        date_naissance: new Date("2008-04-25"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 18,
        nom: "Dupontel",
        prenom: "Sylvain",
        classe: 4,
        date_naissance: new Date("2008-05-02"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 19,
        nom: "Avati",
        prenom: "Tom",
        classe: 4,
        date_naissance: new Date("2008-05-30"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 20,
        nom: "Lidar",
        prenom: "Thierry",
        classe: 2,
        date_naissance: new Date("2013-06-02"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 21,
        nom: "Mo",
        prenom: "Francis",
        classe: 2,
        date_naissance: new Date("2013-06-03"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 22,
        nom: "Obino",
        prenom: "Alex",
        classe: 2,
        date_naissance: new Date("2013-06-08"),
        adresse: "2 rue Jean Paul 92340 Vallodo",
        sexe: "HOMME",
      },
      {
        // _id: 23,
        nom: "Martin",
        prenom: "Julien",
        classe: 3,
        date_naissance: new Date("2010-06-09"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 24,
        nom: "Balado",
        prenom: "Arnaud",
        classe: 3,
        date_naissance: new Date("2011-06-13"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 25,
        nom: "Falafav",
        prenom: "Cedric",
        classe: 3,
        date_naissance: new Date("2010-06-17"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 26,
        nom: "Dominicci",
        prenom: "Adrien",
        classe: 4,
        date_naissance: new Date("2009-06-25"),
        adresse: "32 rue des Fleurs 75018 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 27,
        nom: "Julives",
        prenom: "Fabien",
        classe: 4,
        date_naissance: new Date("2008-06-30"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 28,
        nom: "Loribo",
        prenom: "Paul",
        classe: 4,
        date_naissance: new Date("2008-07-04"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 29,
        nom: "Allen",
        prenom: "Pierre",
        classe: 4,
        date_naissance: new Date("2008-07-14"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 30,
        nom: "Renaldino",
        prenom: "Yann",
        classe: 4,
        date_naissance: new Date("2008-07-15"),
        adresse: "43 rue du Temps 75015 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 31,
        nom: "Margalev",
        prenom: "Vincent",
        classe: 4,
        date_naissance: new Date("2008-07-31"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 32,
        nom: "Roidunor",
        prenom: "Denis",
        classe: 4,
        date_naissance: new Date("2008-08-01"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 33,
        nom: "Tong",
        prenom: "Hing",
        classe: 4,
        date_naissance: new Date("2008-08-02"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 34,
        nom: "Du Chemin",
        prenom: "Ludovic",
        classe: 3,
        date_naissance: new Date("2009-08-12"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 35,
        nom: "Denali",
        prenom: "Daniel",
        classe: 3,
        date_naissance: new Date("2010-08-22"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 36,
        nom: "Maccimo",
        prenom: "Marcel",
        classe: 3,
        date_naissance: new Date("2010-08-23"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 37,
        nom: "Formi",
        prenom: "Alexandre",
        classe: 3,
        date_naissance: new Date("2010-09-03"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 38,
        nom: "Malengo",
        prenom: "Tom",
        classe: 3,
        date_naissance: new Date("2010-10-04"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 39,
        nom: "Legrand",
        prenom: "Jean-Batiste",
        classe: 3,
        date_naissance: new Date("2010-10-05"),
        adresse: "14 rue des Souris 93100 Saint-Denis",
        sexe: "HOMME",
      },
      {
        // _id: 40,
        nom: "Lebeau",
        prenom: "Olivier",
        classe: 3,
        date_naissance: new Date("2010-10-07"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 41,
        nom: "Hariford",
        prenom: "John",
        classe: 2,
        date_naissance: new Date("2010-10-08"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 42,
        nom: "Lessetaire",
        prenom: "Hanibal",
        classe: 2,
        date_naissance: new Date("2012-10-12"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 43,
        nom: "Dupont",
        prenom: "Albert",
        classe: 2,
        date_naissance: new Date("2011-10-13"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 44,
        nom: "Burmi",
        prenom: "Nestor",
        classe: 2,
        date_naissance: new Date("2012-10-20"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 45,
        nom: "Foredecafay",
        prenom: "Felix",
        classe: 2,
        date_naissance: new Date("2012-10-21"),
        adresse: "23 av. du Ciel 75014 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 46,
        nom: "Lepetit",
        prenom: "Nicolas",
        classe: 2,
        date_naissance: new Date("2011-11-04"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 47,
        nom: "Daudet",
        prenom: "Alphonse",
        classe: 2,
        date_naissance: new Date("2012-11-18"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 48,
        nom: "Valegin",
        prenom: "Jean",
        classe: 1,
        date_naissance: new Date("2014-11-28"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 49,
        nom: "Eto",
        prenom: "Gabin",
        classe: 1,
        date_naissance: new Date("2015-11-18"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 50,
        nom: "Fivolini",
        prenom: "Kevin",
        classe: 1,
        date_naissance: new Date("2015-12-06"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 51,
        nom: "Laferme",
        prenom: "Martin",
        classe: 1,
        date_naissance: new Date("2015-12-07"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 52,
        nom: "Dupuis",
        prenom: "Vincent",
        classe: 1,
        date_naissance: new Date("2015-12-15"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        // _id: 53,
        nom: "Lagrange",
        prenom: "Alexandre",
        classe: 1,
        date_naissance: new Date("2014-12-28"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
    ]);
    console.log(`✅ ${eleves.length} élèves insérés`);

    // 4. Matières
    // const matieres = await Matiere.insertMany([
    //   { _id: 1, nom: "LECTURE-CP" },
    //   { _id: 2, nom: "LECTURE-CE1" },
    //   { _id: 3, nom: "SCIENCES & DECOUVERTES" },
    //   { _id: 4, nom: "MATHEMATIQUES" },
    //   { _id: 5, nom: "EVEIL SPORTIF" },
    // ]);
    // console.log(`✅ ${matieres.length} matières insérées`);

    // // 5. Trimestres
    // const trimestres = await Trimestre.insertMany([
    //   { _id: 1, nom: "TRIM01", date: new Date("2023-12-01") },
    //   { _id: 2, nom: "TRIM02", date: new Date("2024-03-08") },
    //   { _id: 3, nom: "TRIM03", date: new Date("2024-06-21") },
    // ]);
    // console.log(`✅ ${trimestres.length} trimestres insérés`);

    // // 6. Notes
    // const notes = await Note.insertMany([
    //   { _id: 1, dateSaisie: new Date("2019-10-15"), idEleve: 2, idClasse: 2, idMatiere: 5, idProf: 2, idTrimestre: 1, note: 12, avis: "Travail à approfondir", avancement: 0 },
    //   { _id: 2, dateSaisie: new Date("2019-11-15"), idEleve: 3, idClasse: 1, idMatiere: 5, idProf: 2, idTrimestre: 1, note: 15, avis: "Bon travail", avancement: 0 },
    //   { _id: 3, dateSaisie: new Date("2019-12-15"), idEleve: 2, idClasse: 2, idMatiere: 5, idProf: 2, idTrimestre: 1, note: 13, avis: "Travail en progression", avancement: 0 },
    // ]);
    // console.log(`✅ ${notes.length} notes insérées`);

    console.log("\n🎉 Base de données peuplée avec succès !");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur:", error.message);
    process.exit(1);
  }
};

seedDatabase();
