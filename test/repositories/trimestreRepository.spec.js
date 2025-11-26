const Trimestre = require("../../src/models/Trimestre");
const trimestreRepository = require("../../src/repositories/trimestreRepository");

jest.mock("../../src/models/Trimestre", () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

describe("TrimestreRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("devrait appeler Trimestre.find()", async () => {
      const mockData = [
        {
          _id: "1",
          nom: "Trimestre 1",
          date: new Date("2025-02-01"),
        },
      ];
      Trimestre.find.mockResolvedValue(mockData);

      const result = await trimestreRepository.findAll();

      expect(Trimestre.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockData);
    });
  });

  describe("findById", () => {
    it("devrait appeler Trimestre.findById()", async () => {
      const mockData = {
        _id: "1",
        nom: "Trimestre 1",
        date: new Date("2025-02-01"),
      };
      Trimestre.findById.mockResolvedValue(mockData);

      const result = await trimestreRepository.findById("1");

      expect(Trimestre.findById).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockData);
    });
  });

  describe("create", () => {
    it("devrait appeler Trimestre.create()", async () => {
      const mockData = {
        nom: "Trimestre 1",
        date: new Date("2025-02-01"),
      };
      const createdData = { _id: "1", ...mockData };
      Trimestre.create.mockResolvedValue(createdData);

      const result = await trimestreRepository.create(mockData);

      expect(Trimestre.create).toHaveBeenCalledWith(mockData);
      expect(result).toEqual(createdData);
    });
  });

  describe("update", () => {
    it("devrait appeler Trimestre.findByIdAndUpdate()", async () => {
      const updateData = {
        nom: "Trimestre 1 Modifié",
      };
      const updatedData = {
        _id: "1",
        nom: "Trimestre 1 Modifié",
        date: new Date("2025-02-01"),
      };
      Trimestre.findByIdAndUpdate.mockResolvedValue(updatedData);

      const result = await trimestreRepository.update("1", updateData);

      expect(Trimestre.findByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        updateData,
        { new: true }
      );
      expect(result).toEqual(updatedData);
    });
  });

  describe("delete", () => {
    it("devrait appeler Trimestre.findByIdAndDelete()", async () => {
      const mockData = {
        _id: "1",
        nom: "Trimestre 1",
        date: new Date("2025-02-01"),
      };
      Trimestre.findByIdAndDelete.mockResolvedValue(mockData);

      const result = await trimestreRepository.delete("1");

      expect(Trimestre.findByIdAndDelete).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockData);
    });
  });
});
