const notesRepository = require('../models/Notes');

let nextNoteId = notesRepository.length ? Math.max(...notesRepository.map((e) => e.idnotes)) + 1 : 1;

exports.findAll = () => {
  return notesRepository;
}

exports.findById = (id) => {
  return notesRepository.find((e) => e.idnotes === Number(id)) || null;
}

exports.create = (data) => {
  const note = {
    idnotes: nextNoteId++,
    date_saisie: data.date_saisie || null,
    ideleve: data.ideleve || null,
    idclasse: data.idclasse || null,
    idmatiere: data.idmatiere || null,
    idprof: data.idprof || null,
    idtrimestre: data.idtrimestre || null,
    note: data.note || null,
    avis: data.avis || "",
    avancement: data.avancement || 0,
  };
  notesRepository.push(note);
}

exports.update = (id, data) => {
  const index = notesRepository.findIndex((e) => e.idnotes === Number(id));
  if (index === -1) return null;

  notesRepository[index] = {
    ...notesRepository[index],
    ...data,
    idnotes: notesRepository[index].idnotes,
  };

  return notesRepository[index];
};

exports.delete = (id) => {
  const index = notesRepository.findIndex((e) => e.idnotes === Number(id));
  if (index === -1) return null;

  const deleted = notesRepository[index];
  notesRepository.splice(index, 1);
  return deleted;
};
