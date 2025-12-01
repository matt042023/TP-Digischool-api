const notesRepository = require('../models/Notes');

exports.findAll = () => {
  return notesRepository.find();
}

exports.findById = (id) => {
  return notesRepository.findById(id);
}

exports.create = (data) => {
  return notesRepository.create(data);
}

exports.update = (id, data) => {
  return notesRepository.findByIdAndUpdate(id, data, { new: true });
}

exports.delete = (id) => {
  return notesRepository.findByIdAndDelete(id);
}


exports.findByProfesseur = (professeurId) => {
  return notesRepository.find({ idProf: professeurId })
    .populate('idEleve', 'nom prenom')
    .populate('idMatiere', 'nom')
    .populate('idClasse', 'nom')
    .populate('idTrimestre', 'nom')
    .populate('idProf', 'nom prenom');
}

exports.findByTrimestreAndClasse = (trimestreId, classeId) => {
  return notesRepository.find({
    idTrimestre: trimestreId,
    idClasse: classeId
  })
    .populate('idEleve', 'nom prenom')
    .populate('idMatiere', 'nom')
    .populate('idClasse', 'nom')
    .populate('idTrimestre', 'nom')
    .populate('idProf', 'nom prenom');
}

exports.findByEleve = (eleveId) => {
  return notesRepository.find({ idEleve: eleveId })
    .populate({
      path: 'idMatiere',     // on populera la matière
      select: 'nom -_id'     // ne récupérer que le nom de la matière, pas l'_id
    })
    .select('idMatiere note avis')  // récupére que ces champs dans Notes
};

