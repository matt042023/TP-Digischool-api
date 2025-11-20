const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/digischools", {});
    console.log("MongoDB connecté !");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB :", error);
    process.exit(1); // arrête le serveur si connexion échoue
  }
};

module.exports = connectDB;
