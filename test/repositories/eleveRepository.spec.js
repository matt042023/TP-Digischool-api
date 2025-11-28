const Eleve = require("../../src/models/Eleve");
const eleveRepository = require("../../src/repositories/eleveRepository");

jest.mock("../../src/models/Eleve.js", () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  aggregate: jest.fn(),
}));

describe("EleveRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("devrait appeler Eleve.find() avec populate", async () => {
      const mockEleves = [{ _id: "1", nom: "Dupont" }];
      Eleve.find.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockEleves),
      });

      const result = await eleveRepository.findAll();

      expect(Eleve.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockEleves);
    });
  });

  describe("findById", () => {
    it("devrait appeler Eleve.findById() avec populate", async () => {
      const mockEleve = { _id: "1", nom: "Dupont" };
      Eleve.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockEleve),
      });

      const result = await eleveRepository.findById("1");

      expect(Eleve.findById).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockEleve);
    });
  });

  describe("create", () => {
    it("devrait appeler Eleve.create()", async () => {
      const newEleve = { nom: "Dupont", sexe: "M", classe: "classId" };
      const createdEleve = { _id: "1", ...newEleve };
      Eleve.create.mockResolvedValue(createdEleve);

      const result = await eleveRepository.create(newEleve);

      expect(Eleve.create).toHaveBeenCalledWith(newEleve);
      expect(result).toEqual(createdEleve);
    });
  });

  describe("update", () => {
    it("devrait appeler Eleve.findByIdAndUpdate()", async () => {
      const updateData = { nom: "Martin" };
      const updatedEleve = { _id: "1", nom: "Martin" };
      Eleve.findByIdAndUpdate.mockResolvedValue(updatedEleve);

      const result = await eleveRepository.update("1", updateData);

      expect(Eleve.findByIdAndUpdate).toHaveBeenCalledWith("1", updateData, {
        new: true,
      });
      expect(result).toEqual(updatedEleve);
    });
  });

  describe("remove", () => {
    it("devrait appeler Eleve.findByIdAndDelete()", async () => {
      const deletedEleve = { _id: "1", nom: "Dupont" };
      Eleve.findByIdAndDelete.mockResolvedValue(deletedEleve);

      const result = await eleveRepository.remove("1");

      expect(Eleve.findByIdAndDelete).toHaveBeenCalledWith("1");
      expect(result).toEqual(deletedEleve);
    });
  });

  describe("findAllGroupedByClasse", () => {
    it("devrait appeler Eleve.aggregate() avec le bon pipeline", async () => {
      const mockElevesGrouped = [
        {
          classeId: "classId1",
          classeNom: "CP",
          total: 2,
          eleves: [
            { _id: "1", nom: "Dupont", sexe: "M" },
            { _id: "2", nom: "Martin", sexe: "F" },
          ],
        },
      ];
      Eleve.aggregate.mockResolvedValue(mockElevesGrouped);

      const result = await eleveRepository.findAllGroupedByClasse();

      expect(Eleve.aggregate).toHaveBeenCalledTimes(1);
      expect(Eleve.aggregate).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ $lookup: expect.any(Object) }),
          expect.objectContaining({ $unwind: expect.any(String) }),
          expect.objectContaining({ $group: expect.any(Object) }),
          expect.objectContaining({ $project: expect.any(Object) }),
          expect.objectContaining({ $sort: expect.any(Object) }),
        ])
      );
      expect(result).toEqual(mockElevesGrouped);
    });
  });
});
