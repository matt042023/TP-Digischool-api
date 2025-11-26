const Notes = require("../../src/models/Notes");
const notesRepository = require("../../src/repositories/notesRepository");

jest.mock("../../src/models/Notes", () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

describe("NotesRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("devrait appeler Notes.find()", async () => {
      const mockData = [
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
      Notes.find.mockResolvedValue(mockData);

      const result = await notesRepository.findAll();

      expect(Notes.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockData);
    });
  });

  describe("findById", () => {
    it("devrait appeler Notes.findById()", async () => {
      const mockData = {
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
      Notes.findById.mockResolvedValue(mockData);

      const result = await notesRepository.findById("1");

      expect(Notes.findById).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockData);
    });
  });

  describe("create", () => {
    it("devrait appeler Notes.create()", async () => {
      const mockData = {
        dateSaisie: new Date(),
        idEleve: "ObjectId('69247f0dab755a53c4af4b1b')",
        idClasse: "ObjectId('69247f0dab755a53c4af4b1b')",
        idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
        idTrimestre: "ObjectId('69247f0dab755a53c4af4b1b')",
        note: 18,
        avis: "Très bien",
        avancement: 0,
      };
      const createdData = { _id: "1", ...mockData };
      Notes.create.mockResolvedValue(createdData);

      const result = await notesRepository.create(mockData);

      expect(Notes.create).toHaveBeenCalledWith(mockData);
      expect(result).toEqual(createdData);
    });
  });

  describe("update", () => {
    it("devrait appeler Notes.findByIdAndUpdate()", async () => {
      const updateData = { note: 19 };
      const updatedData = {
        _id: "1",
        dateSaisie: new Date(),
        idEleve: "ObjectId('69247f0dab755a53c4af4b1b')",
        idClasse: "ObjectId('69247f0dab755a53c4af4b1b')",
        idMatiere: "ObjectId('69247f0dab755a53c4af4b1b')",
        idTrimestre: "ObjectId('69247f0dab755a53c4af4b1b')",
        note: 19,
        avis: "Excellent",
        avancement: 0,
      };
      Notes.findByIdAndUpdate.mockResolvedValue(updatedData);

      const result = await notesRepository.update("1", updateData);

      expect(Notes.findByIdAndUpdate).toHaveBeenCalledWith("1", updateData, {
        new: true,
      });
      expect(result).toEqual(updatedData);
    });
  });

  describe("delete", () => {
    it("devrait appeler Notes.findByIdAndDelete()", async () => {
      const mockData = {
        _id: "1",
        note: 18,
      };
      Notes.findByIdAndDelete.mockResolvedValue(mockData);

      const result = await notesRepository.delete("1");

      expect(Notes.findByIdAndDelete).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockData);
    });
  });
});
