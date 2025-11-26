const classeService = require("../../src/services/classeService");
const ClasseRepository = require("../../src/repositories/classeRepository");

jest.mock("../../src/repositories/classeRepository");

describe("ClasseService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getById", () => {
    it("devrait retourner une classe par son id", async () => {
      const mockClasse = { _id: "1", nom: "6A" };
      ClasseRepository.getById.mockResolvedValue(mockClasse);

      const result = await classeService.getById("1");

      expect(result).toEqual(mockClasse);
      expect(ClasseRepository.getById).toHaveBeenCalledWith("1");
    });
  });

  describe("getAll", () => {
    it("devrait retourner toutes les classes", async () => {
      const mockClasses = [
        { _id: "1", nom: "6A" },
        { _id: "2", nom: "6B" },
      ];
      ClasseRepository.getAll.mockResolvedValue(mockClasses);

      const result = await classeService.getAll();

      expect(result).toEqual(mockClasses);
      expect(ClasseRepository.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("create", () => {
    it("devrait créer une nouvelle classe", async () => {
      const newClasse = { nom: "6C" };
      const createdClasse = { _id: "3", ...newClasse };
      ClasseRepository.create.mockResolvedValue(createdClasse);

      const result = await classeService.create(newClasse);

      expect(result).toEqual(createdClasse);
      expect(ClasseRepository.create).toHaveBeenCalledWith(newClasse);
    });
  });

  describe("update", () => {
    it("devrait mettre à jour une classe", async () => {
      const updateData = { nom: "6A modifiée" };
      const updatedClasse = { _id: "1", nom: "6A modifiée" };
      ClasseRepository.update.mockResolvedValue(updatedClasse);

      const result = await classeService.update("1", updateData);

      expect(result).toEqual(updatedClasse);
      expect(ClasseRepository.update).toHaveBeenCalledWith("1", updateData);
    });
  });

  describe("delete", () => {
    it("devrait supprimer une classe", async () => {
      const deletedClasse = { _id: "1", nom: "6A" };
      ClasseRepository.delete.mockResolvedValue(deletedClasse);

      const result = await classeService.delete("1");

      expect(result).toEqual(deletedClasse);
      expect(ClasseRepository.delete).toHaveBeenCalledWith("1");
    });
  });
});
