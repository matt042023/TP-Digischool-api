const eleveService = require("../../src/services/eleveService");
const EleveRepository = require("../../src/repositories/eleveRepository");

jest.mock("../../src/repositories/eleveRepository");

describe("EleveService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("devrait retourner tous les eleves", async () => {
      const mockEleves = [
        { _id: "1", nom: "Dupont", sexe: "M", classe: "classId1" },
        { _id: "2", nom: "Martin", sexe: "F", classe: "classId2" },
      ];
      EleveRepository.findAll.mockResolvedValue(mockEleves);

      const result = await eleveService.getAll();

      expect(EleveRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockEleves);
    });
  });

  describe("getById", () => {
    it("devrait retourner un eleve par son id", async () => {
      const mockEleve = { _id: "1", nom: "Dupont", sexe: "M", classe: "classId1" };
      EleveRepository.findById.mockResolvedValue(mockEleve);

      const result = await eleveService.getById("1");

      expect(EleveRepository.findById).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockEleve);
    });

    it("devrait lever une erreur si l'eleve n'existe pas", async () => {
      EleveRepository.findById.mockResolvedValue(null);

      await expect(eleveService.getById("999")).rejects.toThrow("introuvable");
    });
  });

  describe("create", () => {
    it("devrait creer un nouvel eleve", async () => {
      const newEleve = { nom: "Durand", sexe: "M", classe: "classId1" };
      const createdEleve = { _id: "3", ...newEleve };
      EleveRepository.create.mockResolvedValue(createdEleve);

      const result = await eleveService.create(newEleve);

      expect(EleveRepository.create).toHaveBeenCalledWith(newEleve);
      expect(result).toEqual(createdEleve);
    });

    it("devrait lever une erreur si le nom est manquant", async () => {
      const invalidEleve = { sexe: "M", classe: "classId1" };

      await expect(eleveService.create(invalidEleve)).rejects.toThrow(
        "obligatoires"
      );
    });

    it("devrait lever une erreur si le sexe est manquant", async () => {
      const invalidEleve = { nom: "Durand", classe: "classId1" };

      await expect(eleveService.create(invalidEleve)).rejects.toThrow(
        "obligatoires"
      );
    });

    it("devrait lever une erreur si la classe est manquante", async () => {
      const invalidEleve = { nom: "Durand", sexe: "M" };

      await expect(eleveService.create(invalidEleve)).rejects.toThrow(
        "obligatoires"
      );
    });
  });

  describe("update", () => {
    it("devrait mettre a jour un eleve", async () => {
      const updateData = { nom: "Dupont-Martin" };
      const updatedEleve = { _id: "1", nom: "Dupont-Martin", sexe: "M", classe: "classId1" };
      EleveRepository.update.mockResolvedValue(updatedEleve);

      const result = await eleveService.update("1", updateData);

      expect(EleveRepository.update).toHaveBeenCalledWith("1", updateData);
      expect(result).toEqual(updatedEleve);
    });

    it("devrait lever une erreur si l'eleve n'existe pas", async () => {
      EleveRepository.update.mockResolvedValue(null);

      await expect(eleveService.update("999", { nom: "Test" })).rejects.toThrow(
        "Impossible de mettre"
      );
    });
  });

  describe("delete", () => {
    it("devrait supprimer un eleve", async () => {
      const deletedEleve = { _id: "1", nom: "Dupont", sexe: "M", classe: "classId1" };
      EleveRepository.remove.mockResolvedValue(deletedEleve);

      const result = await eleveService.delete("1");

      expect(EleveRepository.remove).toHaveBeenCalledWith("1");
      expect(result).toEqual(deletedEleve);
    });

    it("devrait lever une erreur si l'eleve n'existe pas", async () => {
      EleveRepository.remove.mockResolvedValue(null);

      await expect(eleveService.delete("999")).rejects.toThrow(
        "Impossible de supprimer"
      );
    });
  });
});
