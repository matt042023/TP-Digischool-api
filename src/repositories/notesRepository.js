const Notes = require('../models/Notes');

class NotesRepository {
  async findAll() {
    return Notes.find()
      .populate('ideleve')
      .populate('idclasse')
      .populate('idmatiere')
      .populate('idprof')
      .populate('idtrimestre');
  }

  async findById(id) {
    return Notes.findById(id)
      .populate('ideleve')
      .populate('idclasse')
      .populate('idmatiere')
      .populate('idprof')
      .populate('idtrimestre');
  }

  async create(data) {
    const note = new Notes(data);
    return note.save();
  }

  async update(id, data) {
    return Notes.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return Notes.findByIdAndDelete(id);
  }
}

module.exports = new NotesRepository();
