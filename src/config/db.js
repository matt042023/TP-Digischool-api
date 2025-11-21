const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("⚡ MongoDB connecté !");
  } catch (error) {
    console.error("❌ Erreur connexion MongoDB :", error.message);
    process.exit(1);
  }
};