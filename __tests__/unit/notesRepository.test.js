const Notes = require('../../src/models/Notes');
const notesRepository = require('../../src/repositories/notesRepository');

jest.mock('../../src/models/Notes.js', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn()
}));

describe('notesRepository Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('findAll doit appeler Notes.find()', async () => {
    const mockData = [
      {
        id: 1,
        dateSaisie: new Date(),
        idEleve: "ObjectId('69247f0dab755a53c4af4b1b')",
        idClasse: "ObjectId('69247f0dab755a53c4af4b1b')",
        idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
        idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
        idTrimestre: "ObjectId('69247f0dab755a53c4af4b1b')",
        note: 18,
        avis: "Nul",
        avancement: 0
      }
    ]

    Notes.find.mockReturnValue(mockData);

    const result = await notesRepository.findAll();

    expect(Notes.find).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });

  test('findById doit appeler Notes.findById()', async () => {
    const mockData = {
      id: 1,
      dateSaisie: new Date(),
      idEleve: "ObjectId('69247f0dab755a53c4af4b1b')",
      idClasse: "ObjectId('69247f0dab755a53c4af4b1b')",
      idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
      idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
      idTrimestre: "ObjectId('69247f0dab755a53c4af4b1b')",
      note: 18,
      avis: "Nul",
      avancement: 0
    }

    Notes.findById.mockReturnValue(mockData);

    const result = await notesRepository.findById(mockData.id);

    expect(Notes.findById).toHaveBeenCalledWith(mockData.id);
    expect(result).toEqual(mockData);
  });

  test('create doit appeler Notes.create()', async () => {
    const mockData = {
      dateSaisie: new Date(),
      idEleve: "ObjectId('69247f0dab755a53c4af4b1b')",
      idClasse: "ObjectId('69247f0dab755a53c4af4b1b')",
      idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
      idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
      idTrimestre: "ObjectId('69247f0dab755a53c4af4b1b')",
      note: 18,
      avis: "Nul",
      avancement: 0
    }

    Notes.create.mockReturnValue(mockData);

    const result = await notesRepository.create(mockData);

    expect(Notes.create).toHaveBeenCalledWith(mockData);
    expect(result).toEqual(mockData);
  });

  test('update doit appeler Notes.findByIdAndUpdate()', async () => {
    const mockData = {
      id: 1,
      dateSaisie: new Date(),
      idEleve: "ObjectId('69247f0dab755a53c4af4b1b')",
      idClasse: "ObjectId('69247f0dab755a53c4af4b1b')",
      idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
      idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
      idTrimestre: "ObjectId('69247f0dab755a53c4af4b1b')",
      note: 18,
      avis: "Nul",
      avancement: 0
    }

    Notes.findByIdAndUpdate.mockReturnValue(mockData);

    const result = await notesRepository.update(mockData.id, mockData);

    expect(Notes.findByIdAndUpdate).toHaveBeenCalledWith(mockData.id, mockData, { new: true });
    expect(result).toEqual(mockData);
  });

  test('delete doit appeler Notes.findByIdAndDelete()', async () => {
    const mockData = {
      id: 1,
      dateSaisie: new Date(),
      idEleve: "ObjectId('69247f0dab755a53c4af4b1b')",
      idClasse: "ObjectId('69247f0dab755a53c4af4b1b')",
      idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
      idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
      idTrimestre: "ObjectId('69247f0dab755a53c4af4b1b')",
      note: 18,
      avis: "Nul",
      avancement: 0
    }

    Notes.findByIdAndDelete.mockReturnValue(mockData);

    const result = await notesRepository.delete(mockData.id);

    expect(Notes.findByIdAndDelete).toHaveBeenCalledWith(mockData.id);
    expect(result).toEqual(mockData);
  });
})