const Professeur = require("../../src/models/Professeur");
const professeurRepository = require("../../src/repositories/professeurRepository");

jest.mock("../../src/models/Professeur.js", () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

describe("ProfesseurRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("devrait appeler Professeur.find()", async () => {
      const mockProfesseurs = [{ _id: "1", nom: "Leroy" }];
      Professeur.find.mockResolvedValue(mockProfesseurs);

      const result = await professeurRepository.findAll();

      expect(Professeur.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockProfesseurs);
    });
  });

  describe("findById", () => {
    it("devrait appeler Professeur.findById()", async () => {
      const mockProfesseur = { _id: "1", nom: "Leroy" };
      Professeur.findById.mockResolvedValue(mockProfesseur);

      const result = await professeurRepository.findById("1");

      expect(Professeur.findById).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockProfesseur);
    });
  });

  describe("create", () => {
    it("devrait appeler Professeur.create()", async () => {
      const newProf = { nom: "Bernard", sexe: "F" };
      const createdProf = { _id: "1", ...newProf };
      Professeur.create.mockResolvedValue(createdProf);

      const result = await professeurRepository.create(newProf);

      expect(Professeur.create).toHaveBeenCalledWith(newProf);
      expect(result).toEqual(createdProf);
    });
  });

  describe("update", () => {
    it("devrait appeler Professeur.findByIdAndUpdate()", async () => {
      const updateData = { nom: "Moreau" };
      const updatedProf = { _id: "1", nom: "Moreau" };
      Professeur.findByIdAndUpdate.mockResolvedValue(updatedProf);

      const result = await professeurRepository.update("1", updateData);

      expect(Professeur.findByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        updateData,
        { new: true }
      );
      expect(result).toEqual(updatedProf);
    });
  });

  describe("remove", () => {
    it("devrait appeler Professeur.findByIdAndDelete()", async () => {
      const deletedProf = { _id: "1", nom: "Leroy" };
      Professeur.findByIdAndDelete.mockResolvedValue(deletedProf);

      const result = await professeurRepository.remove("1");

      expect(Professeur.findByIdAndDelete).toHaveBeenCalledWith("1");
      expect(result).toEqual(deletedProf);
    });
  });
});
