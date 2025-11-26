const trimestreService = require("../../src/services/trimestreService");
const trimestreRepository = require("../../src/repositories/trimestreRepository");

jest.mock("../../src/repositories/trimestreRepository");

describe("TrimestreService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createTrimestre", () => {
    it("devrait lancer une erreur si la date ou le nom sont manquants", () => {
      const invalidData = {
        date: new Date("2025-02-01"),
      };

      expect(() => trimestreService.createTrimestre(invalidData)).toThrow(
        "La date et/ou le nom sont obligatoires"
      );
      expect(trimestreRepository.create).not.toHaveBeenCalled();
    });

    it("devrait appeler le repository si la date et le nom sont présents", async () => {
      const validData = {
        nom: "Trimestre 1",
        date: new Date("2025-01-01"),
      };
      trimestreRepository.create.mockResolvedValue(validData);

      const result = await trimestreService.createTrimestre(validData);

      expect(trimestreRepository.create).toHaveBeenCalledWith(validData);
      expect(result).toEqual(validData);
    });
  });

  describe("updateTrimestre", () => {
    it("devrait lancer une erreur si la date ou le nom sont manquants", () => {
      const invalidData = {
        nom: "Trimestre Invalide",
      };

      expect(() => trimestreService.updateTrimestre("1", invalidData)).toThrow(
        "La date et/ou le nom sont obligatoires"
      );
      expect(trimestreRepository.update).not.toHaveBeenCalled();
    });

    it("devrait appeler le repository si la date et le nom sont présents", async () => {
      const validData = {
        nom: "Trimestre 1 Modifié",
        date: new Date("2025-04-01"),
      };
      trimestreRepository.update.mockResolvedValue(validData);

      const result = await trimestreService.updateTrimestre("1", validData);

      expect(trimestreRepository.update).toHaveBeenCalledWith("1", validData);
      expect(result).toEqual(validData);
    });
  });

  describe("getAllTrimestres", () => {
    it("devrait renvoyer tous les trimestres", async () => {
      const mockTrimestres = [
        {
          _id: "1",
          nom: "Trimestre 1",
          date: new Date("2025-02-01"),
        },
        {
          _id: "2",
          nom: "Trimestre 2",
          date: new Date("2025-03-01"),
        },
      ];
      trimestreRepository.findAll.mockResolvedValue(mockTrimestres);

      const result = await trimestreService.getAllTrimestres();

      expect(trimestreRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockTrimestres);
    });
  });

  describe("getTrimestreById", () => {
    it("devrait renvoyer le trimestre correspondant à l'id", async () => {
      const mockTrimestre = {
        _id: "1",
        nom: "Trimestre 1",
        date: new Date("2025-02-01"),
      };
      trimestreRepository.findById.mockResolvedValue(mockTrimestre);

      const result = await trimestreService.getTrimestreById("1");

      expect(trimestreRepository.findById).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockTrimestre);
    });
  });

  describe("deleteTrimestre", () => {
    it("devrait renvoyer le trimestre supprimé", async () => {
      const mockTrimestre = {
        _id: "1",
        nom: "Trimestre 1",
        date: new Date("2025-02-01"),
      };
      trimestreRepository.delete.mockResolvedValue(mockTrimestre);

      const result = await trimestreService.deleteTrimestre("1");

      expect(trimestreRepository.delete).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockTrimestre);
    });
  });
});
