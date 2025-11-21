const MatiereRepository = require("../repositories/matiereRepository");

class MatiereService {
  async getAll() {
    return await MatiereRepository.getAll();
  }

  async getById(id) {
    return await MatiereRepository.getById(id);
  }

  async create(matiereData) {
    return await MatiereRepository.create(matiereData);
  }

  async update(id, updateData) {
    return await MatiereRepository.update(id, updateData);
  }

  async delete(id) {
    return await MatiereRepository.delete(id);
  }
}

module.exports = new MatiereService();
