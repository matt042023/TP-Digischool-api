const notesService = require("../services/notesService");

exports.createNote = async (req, res) => {
  try {
    const note = await notesService.createNote(req.body);
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await notesService.getAllNotes();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await notesService.getNoteById(req.params.id);
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await notesService.updateNote(req.params.id, req.body);
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await notesService.deleteNote(req.params.id);
    res.json({ message: "Note supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getNotesByProfesseur = async (req, res) => {
  try {
    const notes = await notesService.getNotesByProfesseur(req.params.professeurId);
    res.json(notes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getNotesByTrimestreAndClasse = async (req, res) => {
  try {
    const { idTrimestre, idClasse } = req.params;
    const notes = await notesService.getNotesByTrimestreAndClasse(idTrimestre, idClasse);
    res.json(notes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
exports.getNotesByEleve = async (req, res) => {
  try {
    const notes = await notesService.getNotesByEleve(req.params.eleveId);

    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: "Aucune note trouvée pour cet élève" });
    }
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
