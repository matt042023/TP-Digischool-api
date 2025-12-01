const eleves = require("../models/Eleve");

exports.findAll = () => eleves.find().populate("classe");

exports.findById = (id) => eleves.findById(id).populate("classe");

exports.findAllGroupedByClasse = async () => {
  return await eleves.aggregate([
    {
      $lookup: {
        from: "classes",
        localField: "classe",
        foreignField: "_id",
        as: "classeDetails"
      }
    },
    {
      $unwind: "$classeDetails"
    },
    {
      $group: {
        _id: "$classe",
        classe: { $first: "$classeDetails" },
        eleves: {
          $push: {
            _id: "$_id",
            nom: "$nom",
            prenom: "$prenom",
            sexe: "$sexe",
            date_naissance: "$date_naissance",
            adresse: "$adresse"
          }
        },
        total: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        classeId: "$_id",
        classeNom: "$classe.nom",
        eleves: 1,
        total: 1
      }
    },
    {
      $sort: { classeNom: 1 }
    }
  ]);
};

exports.create = (data) => eleves.create(data);

exports.update = (id, data) =>
  eleves.findByIdAndUpdate(id, data, { new: true });

exports.remove = (id) => eleves.findByIdAndDelete(id);

exports.findByClasse = (classeId) => {
  return eleves
    .find({ classe: classeId })
    .select('nom prenom')  // récupère que le nom et le prénom
};