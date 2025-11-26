const MatiereController = require("../../src/controllers/matiereController");
const MatiereService = require("../../src/services/matiereService");

jest.mock("../../src/services/matiereService"); // mock du service

function mockResponse() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
}

describe("MatiereController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getAll should return list of matieres", async () => {
    const req = {};
    const res = mockResponse();

    MatiereService.getAll.mockResolvedValue([{ _id: "1", nom: "Maths" }]);

    await MatiereController.getAll(req, res);

    expect(MatiereService.getAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith([{ _id: "1", nom: "Maths" }]);
  });

  test("getAll should catch errors", async () => {
    const req = {};
    const res = mockResponse();

    MatiereService.getAll.mockRejectedValue(new Error("DB error"));

    await MatiereController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
  });

  test("getById should return a matiere", async () => {
    const req = { params: { id: "1" } };
    const res = mockResponse();

    MatiereService.getById.mockResolvedValue({ _id: "1", nom: "Maths" });

    await MatiereController.getById(req, res);

    expect(MatiereService.getById).toHaveBeenCalledWith("1");
    expect(res.json).toHaveBeenCalledWith({ _id: "1", nom: "Maths" });
  });

  test("getById should return 404 if not found", async () => {
    const req = { params: { id: "999" } };
    const res = mockResponse();

    MatiereService.getById.mockResolvedValue(null);

    await MatiereController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Matière non trouvée" });
  });

  test("getById should catch errors", async () => {
    const req = { params: { id: "1" } };
    const res = mockResponse();

    MatiereService.getById.mockRejectedValue(new Error("DB error"));

    await MatiereController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
  });

  test("create should return 201 with new matiere", async () => {
    const req = { body: { nom: "Maths" } };
    const res = mockResponse();

    MatiereService.create.mockResolvedValue({ _id: "1", nom: "Maths" });

    await MatiereController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ _id: "1", nom: "Maths" });
  });

  test("create should catch errors", async () => {
    const req = { body: { nom: "Maths" } };
    const res = mockResponse();

    MatiereService.create.mockRejectedValue(new Error("DB error"));

    await MatiereController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
  });

  test("update should return updated matiere", async () => {
    const req = { params: { id: "1" }, body: { nom: "Français" } };
    const res = mockResponse();

    MatiereService.update.mockResolvedValue({ _id: "1", nom: "Français" });

    await MatiereController.update(req, res);

    expect(res.json).toHaveBeenCalledWith({ _id: "1", nom: "Français" });
  });

  test("update should return 404 if matiere not found", async () => {
    const req = { params: { id: "999" }, body: { nom: "Français" } };
    const res = mockResponse();

    MatiereService.update.mockResolvedValue(null);

    await MatiereController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Matière non trouvée" });
  });

  test("update should catch errors", async () => {
    const req = { params: { id: "1" }, body: { nom: "Français" } };
    const res = mockResponse();

    MatiereService.update.mockRejectedValue(new Error("DB error"));

    await MatiereController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
  });

  test("delete should return success message", async () => {
    const req = { params: { id: "1" } };
    const res = mockResponse();

    MatiereService.delete.mockResolvedValue(true);

    await MatiereController.delete(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: "Matière supprimée" });
  });

  test("delete should return 404 if matiere not found", async () => {
    const req = { params: { id: "999" } };
    const res = mockResponse();

    MatiereService.delete.mockResolvedValue(null);

    await MatiereController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Matière non trouvée" });
  });

  test("delete should catch errors", async () => {
    const req = { params: { id: "1" } };
    const res = mockResponse();

    MatiereService.delete.mockRejectedValue(new Error("DB error"));

    await MatiereController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
  });
});
