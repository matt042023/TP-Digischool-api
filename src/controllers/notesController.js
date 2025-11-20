const notesService = require("../services/notesService");

exports.createNote = (req, res) => {
  try {
    const note = notesService.createNote(req.body);
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllNotes = (req, res) => {
  try {
    const notes = notesService.getAllNotes();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNoteById = (req, res) => {
  try {
    const note = notesService.getNoteById(req.params.id);
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateNote = (req, res) => {
  try {
    const note = notesService.updateNote(req.params.id, req.body);
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteNote = (req, res) => {
  try {
    notesService.deleteNote(req.params.id);
    res.json({ message: "Note supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
