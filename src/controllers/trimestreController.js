const TrimestreRepository = require('../repositories/trimestreRepository');

class TrimestreController {
  async getAll(req, res) {
    const trimestres = await TrimestreRepository.findAll();
    res.json(trimestres);
  }

  async getById(req, res) {
    const trimestre = await TrimestreRepository.findById(req.params.id);
    res.json(trimestre);
  }

  async create(req, res) {
    const trimestre = await TrimestreRepository.create(req.body);
    res.status(201).json(trimestre);
  }

  async update(req, res) {
    const trimestre = await TrimestreRepository.update(req.params.id, req.body);
    res.json(trimestre);
  }

  async delete(req, res) {
    await TrimestreRepository.delete(req.params.id);
    res.status(204).send();
  }
}

module.exports = new TrimestreController();
