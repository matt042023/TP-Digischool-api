const Trimestre = require('../../src/models/Trimestre');
const trimestreRepository = require('../../src/repositories/trimestreRepository');

jest.mock('../../src/models/Trimestre.js', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn()
}));

describe('trimestreRepository Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('findAll doit appeler Trimestre.find()', async () => {
    const mockData = [
      {
        nom: 'Trimestre 1',
        date: new Date('2025-02-01')
      }
    ]

    Trimestre.find.mockReturnValue(mockData);

    const result = await trimestreRepository.findAll();

    expect(Trimestre.find).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });

  test('findById doit appeler Trimestre.findById()', async () => {
    const mockData = {
      id: 1,
      nom: 'Trimestre 1',
      date: new Date('2025-02-01')
    }

    Trimestre.findById.mockReturnValue(mockData);

    const result = await trimestreRepository.findById(mockData.id);

    expect(Trimestre.findById).toHaveBeenCalledWith(mockData.id);
    expect(result).toEqual(mockData);
  });

  test('create doit appeler Trimestre.create()', async () => {
    const mockData = {
      nom: 'Trimestre 1',
      date: new Date('2025-02-01')
    }

    Trimestre.create.mockReturnValue(mockData);

    const result = await trimestreRepository.create(mockData);

    expect(Trimestre.create).toHaveBeenCalledWith(mockData);
    expect(result).toEqual(mockData);
  });

  test('update doit appeler Trimestre.findByIdAndUpdate()', async () => {
    const mockData = {
      id: 1,
      nom: 'Trimestre 1',
      date: new Date('2025-02-01')
    }

    Trimestre.findByIdAndUpdate.mockReturnValue(mockData);

    const result = await trimestreRepository.update(mockData.id, mockData);

    expect(Trimestre.findByIdAndUpdate).toHaveBeenCalledWith(mockData.id, mockData, { new: true });
    expect(result).toEqual(mockData);
  });

  test('delete doit appeler Trimestre.findByIdAndDelete()', async () => {
    const mockData = {
      id: 1,
      nom: 'Trimestre 1',
      date: new Date('2025-02-01')
    }

    Trimestre.findByIdAndDelete.mockReturnValue(mockData);

    const result = await trimestreRepository.delete(mockData.id);

    expect(Trimestre.findByIdAndDelete).toHaveBeenCalledWith(mockData.id);
    expect(result).toEqual(mockData);
  });
})