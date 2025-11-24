const Classe = require("../../src/models/Classe");
const ClasseRepository = require("../../src/repositories/classeRepository");

jest.mock("../../src/models/Classe"); // Mock de Mongoose

describe("ClasseRepository", () => {

  afterEach(() => {
    jest.clearAllMocks(); // Réinitialiser les mocks après chaque test
  });

  test("getAll should call Classe.find", async () => {
    const fakeClasses = [{ _id: "1", nom: "6A" }];
    Classe.find.mockResolvedValue(fakeClasses);

    const result = await ClasseRepository.getAll();

    expect(Classe.find).toHaveBeenCalled();
    expect(result).toEqual(fakeClasses);
  });

  test("getById should call Classe.findById", async () => {
    const fakeClasse = { _id: "1", nom: "6A" };
    Classe.findById.mockResolvedValue(fakeClasse);

    const result = await ClasseRepository.getById("1");

    expect(Classe.findById).toHaveBeenCalledWith("1");
    expect(result).toEqual(fakeClasse);
  });

  test("create should instantiate Classe and save it", async () => {
    const fakeClasse = { nom: "6A", save: jest.fn().mockResolvedValue({ _id: "1", nom: "6A" }) };
    Classe.mockImplementation(() => fakeClasse);

    const result = await ClasseRepository.create({ nom: "6A" });

    expect(fakeClasse.save).toHaveBeenCalled();
    expect(result).toEqual({ _id: "1", nom: "6A" });
  });

  test("update should call Classe.findByIdAndUpdate", async () => {
    const updatedClasse = { _id: "1", nom: "6B" };
    Classe.findByIdAndUpdate.mockResolvedValue(updatedClasse);

    const result = await ClasseRepository.update("1", { nom: "6B" });

    expect(Classe.findByIdAndUpdate).toHaveBeenCalledWith("1", { nom: "6B" }, { new: true });
    expect(result).toEqual(updatedClasse);
  });

  test("delete should call Classe.findByIdAndDelete", async () => {
    const deletedClasse = { _id: "1", nom: "6A" };
    Classe.findByIdAndDelete.mockResolvedValue(deletedClasse);

    const result = await ClasseRepository.delete("1");

    expect(Classe.findByIdAndDelete).toHaveBeenCalledWith("1");
    expect(result).toEqual(deletedClasse);
  });
});
