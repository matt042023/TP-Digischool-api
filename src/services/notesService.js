const Notes = require("../models/Notes");

const notesService = {

  createNote: async (data) => {
    const note = new Notes(data);
    return await note.save();
  },

  getAllNotes: async () => {
    return await Notes.find()
      .populate("ideleve")
      .populate("idclasse")
      .populate("idmatiere")
      .exec();
  },

  getNotesByEleve: async (eleveId) => {
    return await Notes.find({ ideleve: eleveId })
      .populate("idclasse")
      .populate("idmatiere")
      .exec();
  },

  getNotesByClasseAndMatiere: async (classeId, matiereId) => {
    return await Notes.find({ idclasse: classeId, idmatiere: matiereId })
      .populate("ideleve")
      .exec();
  },

  updateNote: async (noteId, data) => {
    return await Notes.findByIdAndUpdate(noteId, data, { new: true });
  },

  deleteNote: async (noteId) => {
    return await Notes.findByIdAndDelete(noteId);
  }

};

module.exports = notesService;
