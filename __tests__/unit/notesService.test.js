const noteService = require('../../src/services/notesService');
const noteRepository = require('../../src/repositories/notesRepository');

jest.mock('../../src/repositories/notesRepository');

describe('noteService Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('createNote doit lancer une erreur si note est inférieur à 0', async () => {
    const invalidData = {
      dateSaisie: new Date(),
      idEleve: "ObjectId('69247f0dab755a53c4af4b1b')",
      idClasse: "ObjectId('69247f0dab755a53c4af4b1b')",
      idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
      idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
      idTrimestre: "ObjectId('69247f0dab755a53c4af4b1b')",
      note: -1,
      avis: "Nul",
      avancement: 0
    }

    expect(() => noteService.createNote(invalidData)).toThrow('La note doit être comprise entre 0 et 20');
    expect(noteRepository.create).not.toHaveBeenCalled();
  });

  test('createNote doit lancer une erreur si note est supérieur à 20', async () => {
    const invalidData = {
      dateSaisie: new Date(),
      idEleve: "ObjectId('69247f0dab755a53c4af4b1b')",
      idClasse: "ObjectId('69247f0dab755a53c4af4b1b')",
      idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
      idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
      idTrimestre: "ObjectId('69247f0dab755a53c4af4b1b')",
      note: 21,
      avis: "Nul",
      avancement: 0
    }

    expect(() => noteService.createNote(invalidData)).toThrow('La note doit être comprise entre 0 et 20');
    expect(noteRepository.create).not.toHaveBeenCalled();
  });

  test('createNote doit appeler le repository si la note est valide', async () => {
    const validData = {
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

    noteRepository.create.mockReturnValue(validData);

    const result = await noteService.createNote(validData);

    expect(noteRepository.create).toHaveBeenCalledWith(validData);
    expect(result).toEqual(validData);
  })

  test('updateNote doit lancer une erreur si note est inférieur à 0', async () => {
    const invalidData = {
      id: 1,
      dateSaisie: new Date(),
      idEleve: "ObjectId('69247f0dab755a53c4af4b1b')",
      idClasse: "ObjectId('69247f0dab755a53c4af4b1b')",
      idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
      idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
      idTrimestre: "ObjectId('69247f0dab755a53c4af4b1b')",
      note: -1,
      avis: "Nul",
      avancement: 0
    }

    expect(() => noteService.updateNote(invalidData.id, invalidData)).toThrow('La note doit être comprise entre 0 et 20');
    expect(noteRepository.update).not.toHaveBeenCalled();
  });

  test('updateNote doit lancer une erreur si note est supérieur à 20', async () => {
    const invalidData = {
      id: 1,
      dateSaisie: new Date(),
      idEleve: "ObjectId('69247f0dab755a53c4af4b1b')",
      idClasse: "ObjectId('69247f0dab755a53c4af4b1b')",
      idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
      idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
      idTrimestre: "ObjectId('69247f0dab755a53c4af4b1b')",
      note: 21,
      avis: "Nul",
      avancement: 0
    }

    expect(() => noteService.updateNote(invalidData.id, invalidData)).toThrow('La note doit être comprise entre 0 et 20');
    expect(noteRepository.update).not.toHaveBeenCalled();
  });

  test('updateNote doit appeler le repository si la note est valide', async () => {
    const validData = {
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

    noteRepository.update.mockReturnValue(validData);

    const result = await noteService.updateNote(validData.id, validData);

    expect(noteRepository.update).toHaveBeenCalledWith(validData.id, validData);
    expect(result).toEqual(validData);
  });

  test('getAllNotes doit renvoyer toutes les notes', async () => {
    const notes = [
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

    noteRepository.findAll.mockReturnValue(notes);

    const result = await noteService.getAllNotes();

    expect(noteRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(notes);
  });

  test('getNoteById doit renvoyer la note correspondante à l\'id', async () => {
    const note = {
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

    noteRepository.findById.mockReturnValue(note);

    const result = await noteService.getNoteById(note.id);

    expect(noteRepository.findById).toHaveBeenCalledWith(note.id);
    expect(result).toEqual(note);
  });

  test('deleteNote doit renvoyer la note supprimée', async () => {
    const note = {
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

    noteRepository.delete.mockReturnValue(note);

    const result = await noteService.deleteNote(note.id);

    expect(noteRepository.delete).toHaveBeenCalledWith(note.id);
    expect(result).toEqual(note);
  });
});