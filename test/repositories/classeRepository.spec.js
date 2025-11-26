const Classe = require("../../src/models/Classe");
const ClasseRepository = require("../../src/repositories/classeRepository");

jest.mock("../../src/models/Classe");

describe("ClasseRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("devrait appeler Classe.find()", async () => {
      const mockClasses = [{ _id: "1", nom: "6A" }];
      Classe.find.mockResolvedValue(mockClasses);

      const result = await ClasseRepository.getAll();

      expect(Classe.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockClasses);
    });
  });

  describe("getById", () => {
    it("devrait appeler Classe.findById()", async () => {
      const mockClasse = { _id: "1", nom: "6A" };
      Classe.findById.mockResolvedValue(mockClasse);

      const result = await ClasseRepository.getById("1");

      expect(Classe.findById).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockClasse);
    });
  });

  describe("create", () => {
    it("devrait instancier Classe et appeler save()", async () => {
      const mockClasse = {
        nom: "6A",
        save: jest.fn().mockResolvedValue({ _id: "1", nom: "6A" }),
      };
      Classe.mockImplementation(() => mockClasse);

      const result = await ClasseRepository.create({ nom: "6A" });

      expect(mockClasse.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ _id: "1", nom: "6A" });
    });
  });

  describe("update", () => {
    it("devrait appeler Classe.findByIdAndUpdate()", async () => {
      const updatedClasse = { _id: "1", nom: "6B" };
      Classe.findByIdAndUpdate.mockResolvedValue(updatedClasse);

      const result = await ClasseRepository.update("1", { nom: "6B" });

      expect(Classe.findByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        { nom: "6B" },
        { new: true }
      );
      expect(result).toEqual(updatedClasse);
    });
  });

  describe("delete", () => {
    it("devrait appeler Classe.findByIdAndDelete()", async () => {
      const deletedClasse = { _id: "1", nom: "6A" };
      Classe.findByIdAndDelete.mockResolvedValue(deletedClasse);

      const result = await ClasseRepository.delete("1");

      expect(Classe.findByIdAndDelete).toHaveBeenCalledWith("1");
      expect(result).toEqual(deletedClasse);
    });
  });
});
