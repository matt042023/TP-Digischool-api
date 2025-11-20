const NotesRepository = require('../repositories/notesRepository');

class NotesController {
  async getAll(req, res) {
    const notes = await NotesRepository.findAll();
    res.json(notes);
  }

  async getById(req, res) {
    const note = await NotesRepository.findById(req.params.id);
    res.json(note);
  }

  async create(req, res) {
    const note = await NotesRepository.create(req.body);
    res.status(201).json(note);
  }

  async update(req, res) {
    const note = await NotesRepository.update(req.params.id, req.body);
    res.json(note);
  }

  async delete(req, res) {
    await NotesRepository.delete(req.params.id);
    res.status(204).send();
  }
}

module.exports = new NotesController();
