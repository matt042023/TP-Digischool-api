const Trimestre = require("../models/Trimestre");

const trimestreService = {

  createTrimestre: async (data) => {
    const trimestre = new Trimestre(data);
    return await trimestre.save();
  },

  getAllTrimestres: async () => {
    return await Trimestre.find().exec();
  },

  getTrimestreById: async (id) => {
    return await Trimestre.findById(id).exec();
  },

  updateTrimestre: async (id, data) => {
    return await Trimestre.findByIdAndUpdate(id, data, { new: true });
  },

  deleteTrimestre: async (id) => {
    return await Trimestre.findByIdAndDelete(id);
  }

};

module.exports = trimestreService;
