const professeurService = require("../../src/services/professeurService");
const ProfesseurRepository = require("../../src/repositories/professeurRepository");
const ClasseRepository = require("../../src/repositories/classeRepository");

jest.mock("../../src/repositories/professeurRepository");
jest.mock("../../src/repositories/classeRepository");

describe("ProfesseurService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("devrait retourner tous les professeurs", async () => {
      const mockProfesseurs = [
        { _id: "1", nom: "Leroy", sexe: "M" },
        { _id: "2", nom: "Bernard", sexe: "F" },
      ];
      ProfesseurRepository.findAll.mockResolvedValue(mockProfesseurs);

      const result = await professeurService.getAll();

      expect(ProfesseurRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockProfesseurs);
    });

    it("devrait retourner le professeur d'une classe spécifique", async () => {
      const mockClasse = { _id: "classId1", nom: "CP", prof: "profId1" };
      const mockProfesseur = { _id: "profId1", nom: "Leroy", sexe: "M" };
      ClasseRepository.getById.mockResolvedValue(mockClasse);
      ProfesseurRepository.findById.mockResolvedValue(mockProfesseur);

      const result = await professeurService.getAll("classId1");

      expect(ClasseRepository.getById).toHaveBeenCalledWith("classId1");
      expect(ProfesseurRepository.findById).toHaveBeenCalledWith("profId1");
      expect(result).toEqual([mockProfesseur]);
    });

    it("devrait retourner un tableau vide si le professeur n'existe pas", async () => {
      const mockClasse = { _id: "classId1", nom: "CP", prof: "profId1" };
      ClasseRepository.getById.mockResolvedValue(mockClasse);
      ProfesseurRepository.findById.mockResolvedValue(null);

      const result = await professeurService.getAll("classId1");

      expect(result).toEqual([]);
    });

    it("devrait lever une erreur si la classe n'existe pas", async () => {
      ClasseRepository.getById.mockResolvedValue(null);

      await expect(professeurService.getAll("invalidId")).rejects.toThrow("Classe introuvable");
    });
  });

  describe("getById", () => {
    it("devrait retourner un professeur par son id", async () => {
      const mockProf = { _id: "1", nom: "Leroy", sexe: "M" };
      ProfesseurRepository.findById.mockResolvedValue(mockProf);

      const result = await professeurService.getById("1");

      expect(ProfesseurRepository.findById).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockProf);
    });

    it("devrait lever une erreur si le professeur n'existe pas", async () => {
      ProfesseurRepository.findById.mockResolvedValue(null);

      await expect(professeurService.getById("999")).rejects.toThrow("introuvable");
    });
  });

  describe("create", () => {
    it("devrait créer un nouveau professeur", async () => {
      const newProf = { nom: "Moreau", sexe: "F" };
      const createdProf = { _id: "3", ...newProf };
      ProfesseurRepository.create.mockResolvedValue(createdProf);

      const result = await professeurService.create(newProf);

      expect(ProfesseurRepository.create).toHaveBeenCalledWith(newProf);
      expect(result).toEqual(createdProf);
    });

    it("devrait lever une erreur si le nom est manquant", async () => {
      const invalidProf = { sexe: "M" };

      await expect(professeurService.create(invalidProf)).rejects.toThrow(
        "obligatoires"
      );
    });

    it("devrait lever une erreur si le sexe est manquant", async () => {
      const invalidProf = { nom: "Moreau" };

      await expect(professeurService.create(invalidProf)).rejects.toThrow(
        "obligatoires"
      );
    });
  });

  describe("update", () => {
    it("devrait mettre à jour un professeur", async () => {
      const updateData = { nom: "Leroy-Dupont" };
      const updatedProf = { _id: "1", nom: "Leroy-Dupont", sexe: "M" };
      ProfesseurRepository.update.mockResolvedValue(updatedProf);

      const result = await professeurService.update("1", updateData);

      expect(ProfesseurRepository.update).toHaveBeenCalledWith("1", updateData);
      expect(result).toEqual(updatedProf);
    });

    it("devrait lever une erreur si le professeur n'existe pas", async () => {
      ProfesseurRepository.update.mockResolvedValue(null);

      await expect(professeurService.update("999", { nom: "Test" })).rejects.toThrow(
        "Impossible de mettre"
      );
    });
  });

  describe("delete", () => {
    it("devrait supprimer un professeur", async () => {
      const deletedProf = { _id: "1", nom: "Leroy", sexe: "M" };
      ProfesseurRepository.remove.mockResolvedValue(deletedProf);

      const result = await professeurService.delete("1");

      expect(ProfesseurRepository.remove).toHaveBeenCalledWith("1");
      expect(result).toEqual(deletedProf);
    });

    it("devrait lever une erreur si le professeur n'existe pas", async () => {
      ProfesseurRepository.remove.mockResolvedValue(null);

      await expect(professeurService.delete("999")).rejects.toThrow(
        "Impossible de supprimer"
      );
    });
  });
});
