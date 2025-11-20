const TrimestreRepository = require("../repositories/trimestreRepository");

const trimestreService = {

  async getAllTrimestres() {
    return TrimestreRepository.findAll();
  },

  async getTrimestreById(id) {
    return TrimestreRepository.findById(id);
  },

  async createTrimestre(data) {
    if (data.date_debut && data.date_fin && data.date_debut > data.date_fin) {
      throw new Error('La date de début doit être avant la date de fin');
    }
    return TrimestreRepository.create(data);
  },

  async updateTrimestre(id, data) {
    if (data.date_debut && data.date_fin && data.date_debut > data.date_fin) {
      throw new Error('La date de début doit être avant la date de fin');
    }
    return TrimestreRepository.update(id, data);
  },

  async deleteTrimestre(id) {
    return TrimestreRepository.delete(id);
  },
};

module.exports = trimestreService;
