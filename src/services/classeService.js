const ClasseRepository = require("../repositories/classeRepository");

class ClasseService {
  async getAll() {
    return await ClasseRepository.getAll();
  }

  async getById(id) {
    return await ClasseRepository.getById(id);
  }

  async create(classeData) {
    return await ClasseRepository.create(classeData);
  }

  async update(id, updateData) {
    return await ClasseRepository.update(id, updateData);
  }

  async delete(id) {
    return await ClasseRepository.delete(id);
  }
}

module.exports = new ClasseService();
