const NotesRepository = require('../repositories/NotesRepository');

const NotesService = {
  async getAllNotes() {
    return NotesRepository.findAll();
  },

  async getNoteById(id) {
    return NotesRepository.findById(id);
  },

  async createNote(data) {
    return NotesRepository.create(data);
  },

  async updateNote(id, data) {
    if (data.note && (data.note < 0 || data.note > 20)) {
      throw new Error('La note doit être comprise entre 0 et 20');
    }
    return NotesRepository.update(id, data);
  },

  async deleteNote(id) {
    return NotesRepository.delete(id);
  },
}

module.exports = new NotesService();
