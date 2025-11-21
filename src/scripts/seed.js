require("dotenv").config();
const mongoose = require("mongoose");

const Trimestre = require("../models/Trimestre");
const Note = require("../models/Notes");

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Promise.all([
      Trimestre.deleteMany({}),
      Note.deleteMany({}),
    ]);
    console.log("Collections cleared");

    const trimestres = await Trimestre.insertMany([
      {  nom: "TRIM01", date: new Date("2023-12-01") },
      { nom: "TRIM02", date: new Date("2024-03-08") },
      { nom: "TRIM03", date: new Date("2024-06-21") },
    ]);
    console.log(`✅ ${trimestres.length} trimestres insérés`);

    const notes = await Note.insertMany([
      { dateSaisie: new Date("2019-10-15"), ideleve: 2, idclasse: 2, idmatiere: 5, idprof: 2, idtrimestre: 1, note: 12, avis: "Travail à approfondir", avancement: 0 },
      { dateSaisie: new Date("2019-11-15"), ideleve: 3, idclasse: 1, idmatiere: 5, idprof: 2, idtrimestre: 1, note: 15, avis: "Bon travail", avancement: 0 },
      { dateSaisie: new Date("2019-12-15"), ideleve: 2, idclasse: 2, idmatiere: 5, idprof: 2, idtrimestre: 1, note: 13, avis: "Travail en progression", avancement: 0 },
    ]);
    console.log(`✅ ${notes.length} notes insérées`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

seedDatabase();