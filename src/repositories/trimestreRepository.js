const Trimestre = require('../models/Trimestre');

class TrimestreRepository {
  async findAll() {
    return Trimestre.find();
  }

  async findById(id) {
    return Trimestre.findById(id);
  }

  async create(data) {
    const trimestre = new Trimestre(data);
    return trimestre.save();
  }

  async update(id, data) {
    return Trimestre.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return Trimestre.findByIdAndDelete(id);
  }
}

module.exports = new TrimestreRepository();
