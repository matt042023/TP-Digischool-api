const Matiere = require("../../src/models/Matiere");
const MatiereRepository = require("../../src/repositories/matiereRepository");

jest.mock("../../src/models/Matiere");

describe("MatiereRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("devrait appeler Matiere.find()", async () => {
      const mockMatieres = [{ _id: "1", nom: "Mathématiques" }];
      Matiere.find.mockResolvedValue(mockMatieres);

      const result = await MatiereRepository.getAll();

      expect(Matiere.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockMatieres);
    });
  });

  describe("getById", () => {
    it("devrait appeler Matiere.findById()", async () => {
      const mockMatiere = { _id: "1", nom: "Mathématiques" };
      Matiere.findById.mockResolvedValue(mockMatiere);

      const result = await MatiereRepository.getById("1");

      expect(Matiere.findById).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockMatiere);
    });
  });

  describe("create", () => {
    it("devrait instancier Matiere et appeler save()", async () => {
      const mockMatiere = {
        nom: "Mathématiques",
        save: jest
          .fn()
          .mockResolvedValue({ _id: "1", nom: "Mathématiques" }),
      };
      Matiere.mockImplementation(() => mockMatiere);

      const result = await MatiereRepository.create({ nom: "Mathématiques" });

      expect(mockMatiere.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ _id: "1", nom: "Mathématiques" });
    });
  });

  describe("update", () => {
    it("devrait appeler Matiere.findByIdAndUpdate()", async () => {
      const updatedMatiere = { _id: "1", nom: "Français" };
      Matiere.findByIdAndUpdate.mockResolvedValue(updatedMatiere);

      const result = await MatiereRepository.update("1", { nom: "Français" });

      expect(Matiere.findByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        { nom: "Français" },
        { new: true }
      );
      expect(result).toEqual(updatedMatiere);
    });
  });

  describe("delete", () => {
    it("devrait appeler Matiere.findByIdAndDelete()", async () => {
      const deletedMatiere = { _id: "1", nom: "Mathématiques" };
      Matiere.findByIdAndDelete.mockResolvedValue(deletedMatiere);

      const result = await MatiereRepository.delete("1");

      expect(Matiere.findByIdAndDelete).toHaveBeenCalledWith("1");
      expect(result).toEqual(deletedMatiere);
    });
  });
});
