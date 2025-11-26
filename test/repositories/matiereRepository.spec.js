const Matiere = require("../../src/models/Matiere");
const MatiereRepository = require("../../src/repositories/matiereRepository");

jest.mock("../../src/models/Matiere"); // mock de Mongoose

describe("MatiereRepository", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getAll should call Matiere.find", async () => {
    const fakeMatieres = [{ _id: "1", nom: "Maths" }];
    Matiere.find.mockResolvedValue(fakeMatieres);

    const result = await MatiereRepository.getAll();

    expect(Matiere.find).toHaveBeenCalled();
    expect(result).toEqual(fakeMatieres);
  });

  test("getById should call Matiere.findById", async () => {
    const fakeMatiere = { _id: "1", nom: "Maths" };
    Matiere.findById.mockResolvedValue(fakeMatiere);

    const result = await MatiereRepository.getById("1");

    expect(Matiere.findById).toHaveBeenCalledWith("1");
    expect(result).toEqual(fakeMatiere);
  });

  test("create should instantiate Matiere and save it", async () => {
    const fakeMatiere = { nom: "Maths", save: jest.fn().mockResolvedValue({ _id: "1", nom: "Maths" }) };
    Matiere.mockImplementation(() => fakeMatiere);

    const result = await MatiereRepository.create({ nom: "Maths" });

    expect(fakeMatiere.save).toHaveBeenCalled();
    expect(result).toEqual({ _id: "1", nom: "Maths" });
  });

  test("update should call Matiere.findByIdAndUpdate", async () => {
    const updatedMatiere = { _id: "1", nom: "Français" };
    Matiere.findByIdAndUpdate.mockResolvedValue(updatedMatiere);

    const result = await MatiereRepository.update("1", { nom: "Français" });

    expect(Matiere.findByIdAndUpdate).toHaveBeenCalledWith("1", { nom: "Français" }, { new: true });
    expect(result).toEqual(updatedMatiere);
  });

  test("delete should call Matiere.findByIdAndDelete", async () => {
    const deletedMatiere = { _id: "1", nom: "Maths" };
    Matiere.findByIdAndDelete.mockResolvedValue(deletedMatiere);

    const result = await MatiereRepository.delete("1");

    expect(Matiere.findByIdAndDelete).toHaveBeenCalledWith("1");
    expect(result).toEqual(deletedMatiere);
  });
});
