require("dotenv").config();
const mongoose = require("mongoose");

// Import des modèles
const Professeur = require("../models/Professeur");
const Classe = require("../models/Classe");
const Eleve = require("../models/Eleve");
const Matiere = require("../models/Matiere");
const Trimestre = require("../models/Trimestre");
const Note = require("../models/Notes");

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("⚡ Connecté à MongoDB");

    // Nettoyage des collections
    await Promise.all([
      Professeur.deleteMany({}),
      Classe.deleteMany({}),
      Eleve.deleteMany({}),
      Matiere.deleteMany({}),
      Trimestre.deleteMany({}),
      Note.deleteMany({}),
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
    const classes = await Classe.insertMany([
      { nom: "CP", prof: professeurs[0]._id },
      { nom: "CE1", prof: professeurs[1]._id },
      { nom: "CE2", prof: professeurs[1]._id },
      { nom: "CM1", prof: professeurs[2]._id },
      { nom: "CM2", prof: professeurs[2]._id },
    ]);
    console.log(`✅ ${classes.length} classes insérées`);

    // 3. Élèves
    const eleves = await Eleve.insertMany([
      {
        nom: "Durand",
        prenom: "Marie",
        classe: classes[0]._id,
        date_naissance: new Date("2015-01-02"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "FEMME",
      },
      {
        nom: "Alesi",
        prenom: "Julie",
        classe: classes[0]._id,
        date_naissance: new Date("2014-01-08"),
        adresse: "72 av. Jean Dupont 75003 Paris",
        sexe: "FEMME",
      },
      {
        nom: "Martini",
        prenom: "Carine",
        classe: classes[4]._id,
        date_naissance: new Date("2008-01-17"),
        adresse: "2 rue du Moulin 92230 Neullavy",
        sexe: "FEMME",
      },
      {
        nom: "Varola",
        prenom: "Sophie",
        classe: classes[4]._id,
        date_naissance: new Date("2009-01-21"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "FEMME",
      },
      {
        nom: "Labiche",
        prenom: "Lelou",
        classe: classes[4]._id,
        date_naissance: new Date("2009-01-21"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "FEMME",
      },
      {
        nom: "Dujardin",
        prenom: "Anne",
        classe: classes[4]._id,
        date_naissance: new Date("2008-02-03"),
        adresse: "67 rue des Jardins 91800 Brunoy",
        sexe: "FEMME",
      },
      {
        nom: "Laventure",
        prenom: "Martine",
        classe: classes[4]._id,
        date_naissance: new Date("2009-02-15"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "FEMME",
      },
      {
        nom: "Livradu",
        prenom: "Alice",
        classe: classes[4]._id,
        date_naissance: new Date("2008-02-18"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "FEMME",
      },
      {
        nom: "Veronicci",
        prenom: "Cerise",
        classe: classes[4]._id,
        date_naissance: new Date("2008-03-01"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "FEMME",
      },
      {
        nom: "Baladini",
        prenom: "Mathilde",
        classe: classes[4]._id,
        date_naissance: new Date("2009-03-12"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "FEMME",
      },
      {
        nom: "Michelet",
        prenom: "Jean",
        classe: classes[1]._id,
        date_naissance: new Date("2013-04-08"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Dupond",
        prenom: "Pierre",
        classe: classes[1]._id,
        date_naissance: new Date("2013-04-09"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Timberot",
        prenom: "Martin",
        classe: classes[2]._id,
        date_naissance: new Date("2011-04-14"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Gravatas",
        prenom: "Paul",
        classe: classes[2]._id,
        date_naissance: new Date("2011-04-15"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "De La Grange",
        prenom: "Luc",
        classe: classes[4]._id,
        date_naissance: new Date("2008-04-16"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Millot",
        prenom: "Bertrand",
        classe: classes[4]._id,
        date_naissance: new Date("2009-04-20"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Herbert",
        prenom: "Franck",
        classe: classes[3]._id,
        date_naissance: new Date("2008-04-25"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Dupontel",
        prenom: "Sylvain",
        classe: classes[3]._id,
        date_naissance: new Date("2008-05-02"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Avati",
        prenom: "Tom",
        classe: classes[3]._id,
        date_naissance: new Date("2008-05-30"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Lidar",
        prenom: "Thierry",
        classe: classes[1]._id,
        date_naissance: new Date("2013-06-02"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Mo",
        prenom: "Francis",
        classe: classes[1]._id,
        date_naissance: new Date("2013-06-03"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Obino",
        prenom: "Alex",
        classe: classes[1]._id,
        date_naissance: new Date("2013-06-08"),
        adresse: "2 rue Jean Paul 92340 Vallodo",
        sexe: "HOMME",
      },
      {
        nom: "Martin",
        prenom: "Julien",
        classe: classes[2]._id,
        date_naissance: new Date("2010-06-09"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Balado",
        prenom: "Arnaud",
        classe: classes[2]._id,
        date_naissance: new Date("2011-06-13"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Falafav",
        prenom: "Cedric",
        classe: classes[2]._id,
        date_naissance: new Date("2010-06-17"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Dominicci",
        prenom: "Adrien",
        classe: classes[3]._id,
        date_naissance: new Date("2009-06-25"),
        adresse: "32 rue des Fleurs 75018 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Julives",
        prenom: "Fabien",
        classe: classes[3]._id,
        date_naissance: new Date("2008-06-30"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Loribo",
        prenom: "Paul",
        classe: classes[3]._id,
        date_naissance: new Date("2008-07-04"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Allen",
        prenom: "Pierre",
        classe: classes[3]._id,
        date_naissance: new Date("2008-07-14"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Renaldino",
        prenom: "Yann",
        classe: classes[3]._id,
        date_naissance: new Date("2008-07-15"),
        adresse: "43 rue du Temps 75015 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Margalev",
        prenom: "Vincent",
        classe: classes[3]._id,
        date_naissance: new Date("2008-07-31"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Roidunor",
        prenom: "Denis",
        classe: classes[3]._id,
        date_naissance: new Date("2008-08-01"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Tong",
        prenom: "Hing",
        classe: classes[3]._id,
        date_naissance: new Date("2008-08-02"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Du Chemin",
        prenom: "Ludovic",
        classe: classes[2]._id,
        date_naissance: new Date("2009-08-12"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Denali",
        prenom: "Daniel",
        classe: classes[2]._id,
        date_naissance: new Date("2010-08-22"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Maccimo",
        prenom: "Marcel",
        classe: classes[2]._id,
        date_naissance: new Date("2010-08-23"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Formi",
        prenom: "Alexandre",
        classe: classes[2]._id,
        date_naissance: new Date("2010-09-03"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Malengo",
        prenom: "Tom",
        classe: classes[2]._id,
        date_naissance: new Date("2010-10-04"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Legrand",
        prenom: "Jean-Batiste",
        classe: classes[2]._id,
        date_naissance: new Date("2010-10-05"),
        adresse: "14 rue des Souris 93100 Saint-Denis",
        sexe: "HOMME",
      },
      {
        nom: "Lebeau",
        prenom: "Olivier",
        classe: classes[2]._id,
        date_naissance: new Date("2010-10-07"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Hariford",
        prenom: "John",
        classe: classes[1]._id,
        date_naissance: new Date("2010-10-08"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Lessetaire",
        prenom: "Hanibal",
        classe: classes[1]._id,
        date_naissance: new Date("2012-10-12"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Dupont",
        prenom: "Albert",
        classe: classes[1]._id,
        date_naissance: new Date("2011-10-13"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Burmi",
        prenom: "Nestor",
        classe: classes[1]._id,
        date_naissance: new Date("2012-10-20"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Foredecafay",
        prenom: "Felix",
        classe: classes[1]._id,
        date_naissance: new Date("2012-10-21"),
        adresse: "23 av. du Ciel 75014 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Lepetit",
        prenom: "Nicolas",
        classe: classes[1]._id,
        date_naissance: new Date("2011-11-04"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Daudet",
        prenom: "Alphonse",
        classe: classes[1]._id,
        date_naissance: new Date("2012-11-18"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Valegin",
        prenom: "Jean",
        classe: classes[0]._id,
        date_naissance: new Date("2014-11-28"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Eto",
        prenom: "Gabin",
        classe: classes[0]._id,
        date_naissance: new Date("2015-11-18"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Fivolini",
        prenom: "Kevin",
        classe: classes[0]._id,
        date_naissance: new Date("2015-12-06"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Laferme",
        prenom: "Martin",
        classe: classes[0]._id,
        date_naissance: new Date("2015-12-07"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Dupuis",
        prenom: "Vincent",
        classe: classes[0]._id,
        date_naissance: new Date("2015-12-15"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
      {
        nom: "Lagrange",
        prenom: "Alexandre",
        classe: classes[0]._id,
        date_naissance: new Date("2014-12-28"),
        adresse: "15 rue du Lac 75001 Paris",
        sexe: "HOMME",
      },
    ]);
    console.log(`✅ ${eleves.length} élèves insérés`);

    // 4. Matières
    const matieres = await Matiere.insertMany([
      { nom: "LECTURE-CP" },
      { nom: "LECTURE-CE1" },
      { nom: "SCIENCES & DECOUVERTES" },
      { nom: "MATHEMATIQUES" },
      { nom: "EVEIL SPORTIF" },
    ]);
    console.log(`✅ ${matieres.length} matières insérées`);

    // 5. Trimestres
    const trimestres = await Trimestre.insertMany([
      { nom: "TRIM01", date: new Date("2023-12-01") },
      { nom: "TRIM02", date: new Date("2024-03-08") },
      { nom: "TRIM03", date: new Date("2024-06-21") },
    ]);
    console.log(`✅ ${trimestres.length} trimestres insérés`);

    // 6. Notes
    const notes = await Note.insertMany([
      {
        dateSaisie: new Date("2019-10-15"),
        idEleve: eleves[1]._id,
        idClasse: classes[1]._id,
        idMatiere: matieres[4]._id,
        idProf: professeurs[1]._id,
        idTrimestre: trimestres[0]._id,
        note: 12,
        avis: "Travail à approfondir",
        avancement: 0,
      },
      {
        dateSaisie: new Date("2019-11-15"),
        idEleve: eleves[2]._id,
        idClasse: classes[0]._id,
        idMatiere: matieres[4]._id,
        idProf: professeurs[1]._id,
        idTrimestre: trimestres[0]._id,
        note: 15,
        avis: "Bon travail",
        avancement: 0,
      },
      {
        dateSaisie: new Date("2019-12-15"),
        idEleve: eleves[1]._id,
        idClasse: classes[1]._id,
        idMatiere: matieres[4]._id,
        idProf: professeurs[1]._id,
        idTrimestre: trimestres[0]._id,
        note: 13,
        avis: "Travail en progression",
        avancement: 0,
      },
    ]);
    console.log(`✅ ${notes.length} notes insérées`);

    console.log("\n🎉 Base de données peuplée avec succès !");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur:", error.message);

    process.exit(1);
  }
};

seedDatabase();
