const trimestreService = require('../../src/services/trimestreService');
const trimestreRepository = require('../../src/repositories/trimestreRepository');

jest.mock('../../src/repositories/trimestreRepository');

describe('trimestreService Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('createTrimestre doit lancer une erreur si il y a pas la date ou le nom', async () => {
    const invalidData = {
      date: new Date('2025-02-01')
    };

    expect(() => trimestreService.createTrimestre(invalidData)).toThrow('La date et/ou le nom sont obligatoires');
    expect(trimestreRepository.create).not.toHaveBeenCalled();
  });

  test('createTrimestre doit appeler le repository si il y a la date ou le nom', async () => {
    const validData = {
      nom: 'Trimestre Valide',
      date: new Date('2025-01-01')
    };

    trimestreRepository.create.mockReturnValue(validData);

    const result = await trimestreService.createTrimestre(validData);

    expect(trimestreRepository.create).toHaveBeenCalledWith(validData);
    expect(result).toEqual(validData);
  });

  test('updateTrimestre doit lancer une erreur si il n\'a pas de date ou de nom', async () => {
    const invalidData = {
      id: 1,
      nom: 'Trimestre Invalide'
    }

    expect(() => trimestreService.updateTrimestre(invalidData.id, invalidData)).toThrow('La date et/ou le nom sont obligatoires');
    expect(trimestreRepository.update).not.toHaveBeenCalled();
  });

  test('updateTrimestre doit appeler le repository si il y a la date ou le nom', async () => {
    const validData = {
      id: 1,
      nom: 'Trimestre Invalide',
      date: new Date('2025-04-01')
    }

    trimestreRepository.update.mockReturnValue(validData);

    const result = await trimestreService.updateTrimestre(validData.id, validData);

    expect(trimestreRepository.update).toHaveBeenCalledWith(validData.id, validData);
    expect(result).toEqual(validData);
  });

  test('getAllTrimestres doit renvoyer tous les trimestres', async () => {
    const trimestres = [
      {
        id: 1,
        nom: 'Trimestre 1',
        date: new Date('2025-02-01')
      },
      {
        id: 2,
        nom: 'Trimestre 2',
        date: new Date('2025-03-01')
      }
    ]

    trimestreRepository.findAll.mockReturnValue(trimestres);

    const result = await trimestreService.getAllTrimestres();

    expect(trimestreRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(trimestres);
  });

  test('getTrimestreById doit renvoyer le trimestre correespondant à l\'id', async () => {
    const trimestre = [
      {
        id: 1,
        nom: 'Trimestre 1',
        date: new Date('2025-02-01')
      }
    ]

    trimestreRepository.findById.mockReturnValue(trimestre);

    const result = await trimestreService.getTrimestreById(trimestre);

    expect(trimestreRepository.findById).toHaveBeenCalled();
    expect(result).toEqual(trimestre);
  });

  test('deleteTrimestre doit renvoyer le trimestre supprimé', async () => {
    const trimestre = [
      {
        id: 1,
        nom: 'Trimestre 1',
        date: new Date('2025-02-01')
      }
    ]

    trimestreRepository.delete.mockReturnValue(trimestre);

    const result = await trimestreService.deleteTrimestre(trimestre);

    expect(trimestreRepository.delete).toHaveBeenCalled();
    expect(result).toEqual(trimestre);
  })
});
