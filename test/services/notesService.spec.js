const notesService = require("../../src/services/notesService");
const notesRepository = require("../../src/repositories/notesRepository");

jest.mock("../../src/repositories/notesRepository");

describe("NotesService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createNote", () => {
    it("devrait lancer une erreur si la note est inférieure à 0", () => {
      const invalidData = {
        dateSaisie: new Date(),
        idEleve: "ObjectId('69247f0dab755a53c4af4b1b')",
        idClasse: "ObjectId('69247f0dab755a53c4af4b1b')",
        idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
        idTrimestre: "ObjectId('69247f0dab755a53c4af4b1b')",
        note: -1,
        avis: "Nul",
        avancement: 0,
      };

      expect(() => notesService.createNote(invalidData)).toThrow(
        "La note doit être comprise entre 0 et 20"
      );
      expect(notesRepository.create).not.toHaveBeenCalled();
    });

    it("devrait lancer une erreur si la note est supérieure à 20", () => {
      const invalidData = {
        dateSaisie: new Date(),
        idEleve: "ObjectId('69247f0dab755a53c4af4b1b')",
        idClasse: "ObjectId('69247f0dab755a53c4af4b1b')",
        idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
        idTrimestre: "ObjectId('69247f0dab755a53c4af4b1b')",
        note: 21,
        avis: "Nul",
        avancement: 0,
      };

      expect(() => notesService.createNote(invalidData)).toThrow(
        "La note doit être comprise entre 0 et 20"
      );
      expect(notesRepository.create).not.toHaveBeenCalled();
    });

    it("devrait appeler le repository si la note est valide", async () => {
      const validData = {
        dateSaisie: new Date(),
        idEleve: "ObjectId('69247f0dab755a53c4af4b1b')",
        idClasse: "ObjectId('69247f0dab755a53c4af4b1b')",
        idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
        idTrimestre: "ObjectId('69247f0dab755a53c4af4b1b')",
        note: 18,
        avis: "Très bien",
        avancement: 0,
      };
      notesRepository.create.mockResolvedValue(validData);

      const result = await notesService.createNote(validData);

      expect(notesRepository.create).toHaveBeenCalledWith(validData);
      expect(result).toEqual(validData);
    });
  });

  describe("updateNote", () => {
    it("devrait lancer une erreur si la note est inférieure à 0", () => {
      const invalidData = {
        note: -1,
      };

      expect(() => notesService.updateNote("1", invalidData)).toThrow(
        "La note doit être comprise entre 0 et 20"
      );
      expect(notesRepository.update).not.toHaveBeenCalled();
    });

    it("devrait lancer une erreur si la note est supérieure à 20", () => {
      const invalidData = {
        note: 21,
      };

      expect(() => notesService.updateNote("1", invalidData)).toThrow(
        "La note doit être comprise entre 0 et 20"
      );
      expect(notesRepository.update).not.toHaveBeenCalled();
    });

    it("devrait appeler le repository si la note est valide", async () => {
      const validData = {
        note: 18,
        avis: "Très bien",
      };
      notesRepository.update.mockResolvedValue(validData);

      const result = await notesService.updateNote("1", validData);

      expect(notesRepository.update).toHaveBeenCalledWith("1", validData);
      expect(result).toEqual(validData);
    });
  });

  describe("getAllNotes", () => {
    it("devrait renvoyer toutes les notes", async () => {
      const mockNotes = [
        {
          _id: "1",
          dateSaisie: new Date(),
          idEleve: "ObjectId('69247f0dab755a53c4af4b1b')",
          idClasse: "ObjectId('69247f0dab755a53c4af4b1b')",
          idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
          idTrimestre: "ObjectId('69247f0dab755a53c4af4b1b')",
          note: 18,
          avis: "Très bien",
          avancement: 0,
        },
      ];
      notesRepository.findAll.mockResolvedValue(mockNotes);

      const result = await notesService.getAllNotes();

      expect(notesRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockNotes);
    });
  });

  describe("getNoteById", () => {
    it("devrait renvoyer la note correspondant à l'id", async () => {
      const mockNote = {
        _id: "1",
        dateSaisie: new Date(),
        idEleve: "ObjectId('69247f0dab755a53c4af4b1b')",
        idClasse: "ObjectId('69247f0dab755a53c4af4b1b')",
        idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
        idTrimestre: "ObjectId('69247f0dab755a53c4af4b1b')",
        note: 18,
        avis: "Très bien",
        avancement: 0,
      };
      notesRepository.findById.mockResolvedValue(mockNote);

      const result = await notesService.getNoteById("1");

      expect(notesRepository.findById).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockNote);
    });
  });

  describe("deleteNote", () => {
    it("devrait renvoyer la note supprimée", async () => {
      const mockNote = {
        _id: "1",
        note: 18,
      };
      notesRepository.delete.mockResolvedValue(mockNote);

      const result = await notesService.deleteNote("1");

      expect(notesRepository.delete).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockNote);
    });
  });
});
