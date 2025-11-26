const matiereService = require("../../src/services/matiereService");
const MatiereRepository = require("../../src/repositories/matiereRepository");

jest.mock("../../src/repositories/matiereRepository");

describe("MatiereService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getById", () => {
    it("devrait retourner une matière par son id", async () => {
      const mockMatiere = { _id: "1", nom: "Mathématiques" };
      MatiereRepository.getById.mockResolvedValue(mockMatiere);

      const result = await matiereService.getById("1");

      expect(result).toEqual(mockMatiere);
      expect(MatiereRepository.getById).toHaveBeenCalledWith("1");
    });
  });

  describe("getAll", () => {
    it("devrait retourner toutes les matières", async () => {
      const mockMatieres = [
        { _id: "1", nom: "Mathématiques" },
        { _id: "2", nom: "Français" },
      ];
      MatiereRepository.getAll.mockResolvedValue(mockMatieres);

      const result = await matiereService.getAll();

      expect(result).toEqual(mockMatieres);
      expect(MatiereRepository.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("create", () => {
    it("devrait créer une nouvelle matière", async () => {
      const newMatiere = { nom: "Histoire" };
      const createdMatiere = { _id: "3", ...newMatiere };
      MatiereRepository.create.mockResolvedValue(createdMatiere);

      const result = await matiereService.create(newMatiere);

      expect(result).toEqual(createdMatiere);
      expect(MatiereRepository.create).toHaveBeenCalledWith(newMatiere);
    });
  });

  describe("update", () => {
    it("devrait mettre à jour une matière", async () => {
      const updateData = { nom: "Mathématiques Avancées" };
      const updatedMatiere = { _id: "1", nom: "Mathématiques Avancées" };
      MatiereRepository.update.mockResolvedValue(updatedMatiere);

      const result = await matiereService.update("1", updateData);

      expect(result).toEqual(updatedMatiere);
      expect(MatiereRepository.update).toHaveBeenCalledWith("1", updateData);
    });
  });

  describe("delete", () => {
    it("devrait supprimer une matière", async () => {
      const deletedMatiere = { _id: "1", nom: "Mathématiques" };
      MatiereRepository.delete.mockResolvedValue(deletedMatiere);

      const result = await matiereService.delete("1");

      expect(result).toEqual(deletedMatiere);
      expect(MatiereRepository.delete).toHaveBeenCalledWith("1");
    });
  });
});
