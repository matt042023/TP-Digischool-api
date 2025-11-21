require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Import des modèles
const Professeur = require("../models/Professeur");
const Eleve = require("../models/Eleve");

// Fonction pour parser les INSERT du SQL
function parseInserts(sqlContent, tableName) {
  const regex = new RegExp(
    `INSERT INTO \`${tableName}\`[^;]*VALUES([^;]+);`,
    "gis"
  );
  const match = regex.exec(sqlContent);

  if (!match) return [];

  const valuesStr = match[1];
  const rows = [];

  // Extraire chaque tuple de valeurs
  const tupleRegex = /\(([^)]+)\)/g;
  let tupleMatch;

  while ((tupleMatch = tupleRegex.exec(valuesStr)) !== null) {
    const values = [];
    const valueStr = tupleMatch[1];

    // Parser les valeurs en tenant compte des chaînes avec virgules
    let current = "";
    let inString = false;

    for (let i = 0; i < valueStr.length; i++) {
      const char = valueStr[i];

      if (char === "'" && valueStr[i - 1] !== "\\") {
        inString = !inString;
        current += char;
      } else if (char === "," && !inString) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    rows.push(values);
  }

  return rows;
}

// Nettoyer une valeur SQL
function cleanValue(val) {
  if (!val) return null;
  val = val.trim();
  if (val === "NULL") return null;
  if (val.startsWith("'") && val.endsWith("'")) {
    return val.slice(1, -1).replace(/\\'/g, "'");
  }
  return val;
}

const importFromSQL = async () => {
  try {
    // Lire le fichier SQL
    const sqlPath = path.join(__dirname, "../../digischools.sql");
    const sqlContent = fs.readFileSync(sqlPath, "utf8");

    await mongoose.connect(process.env.MONGO_URI);
    console.log("⚡ Connecté à MongoDB");

    // Nettoyage des collections
    await Promise.all([
      Professeur.deleteMany({}),
      Eleve.deleteMany({}),
    ]);
    console.log("🧹 Collections nettoyées");

    // 1. Importer les professeurs
    const profRows = parseInserts(sqlContent, "t_prof");
    const professeurs = profRows.map(row => ({
      nom: cleanValue(row[1]),
      prenom: cleanValue(row[2]),
      date_naissance: cleanValue(row[3]) ? new Date(cleanValue(row[3])) : null,
      adresse: cleanValue(row[4]),
      sexe: cleanValue(row[5]),
    }));

    if (professeurs.length > 0) {
      await Professeur.insertMany(professeurs);
      console.log(`✅ ${professeurs.length} professeurs importés`);
    }

    // 2. Importer les élèves
    const eleveRows = parseInserts(sqlContent, "t_eleve");
    const eleves = eleveRows.map(row => ({
      nom: cleanValue(row[1]),
      prenom: cleanValue(row[2]),
      classe: parseInt(cleanValue(row[3])),
      date_naissance: cleanValue(row[4]) ? new Date(cleanValue(row[4])) : null,
      adresse: cleanValue(row[5]),
      sexe: cleanValue(row[6]),
    }));

    if (eleves.length > 0) {
      await Eleve.insertMany(eleves);
      console.log(`✅ ${eleves.length} élèves importés`);
    }

    console.log("\n🎉 Import depuis SQL terminé avec succès !");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur:", error.message);
    process.exit(1);
  }
};

importFromSQL();
