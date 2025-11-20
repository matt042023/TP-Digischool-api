const notesService = require("../services/notesService");

const notesController = {

  createNote: async (req, res) => {
    try {
      const note = await notesService.createNote(req.body);
      res.status(201).json(note);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAllNotes: async (req, res) => {
    try {
      const notes = await notesService.getAllNotes();
      res.json(notes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getNotesByEleve: async (req, res) => {
    try {
      const notes = await notesService.getNotesByEleve(req.params.eleveId);
      res.json(notes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateNote: async (req, res) => {
    try {
      const note = await notesService.updateNote(req.params.id, req.body);
      res.json(note);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteNote: async (req, res) => {
    try {
      await notesService.deleteNote(req.params.id);
      res.json({ message: "Note supprimée" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

};

module.exports = notesController;
