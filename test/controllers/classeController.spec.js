const ClasseController = require("../../src/controllers/classeController");
const ClasseService = require("../../src/services/classeService");

jest.mock("../../src/services/classeService"); // mock du service

// helper pour mocker res
function mockResponse() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
}

describe("ClasseController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getAll should return list of classes", async () => {
    const req = {};
    const res = mockResponse();

    ClasseService.getAll.mockResolvedValue([{ _id: "1", nom: "6A" }]);

    await ClasseController.getAll(req, res);

    expect(ClasseService.getAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith([{ _id: "1", nom: "6A" }]);
  });

  test("getAll should catch errors", async () => {
    const req = {};
    const res = mockResponse();

    ClasseService.getAll.mockRejectedValue(new Error("DB error"));

    await ClasseController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
  });

  test("getById should return a class", async () => {
    const req = { params: { id: "1" } };
    const res = mockResponse();

    ClasseService.getById.mockResolvedValue({ _id: "1", nom: "6A" });

    await ClasseController.getById(req, res);

    expect(ClasseService.getById).toHaveBeenCalledWith("1");
    expect(res.json).toHaveBeenCalledWith({ _id: "1", nom: "6A" });
  });

  test("getById should return 404 if not found", async () => {
    const req = { params: { id: "999" } };
    const res = mockResponse();

    ClasseService.getById.mockResolvedValue(null);

    await ClasseController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Classe non trouvée" });
  });

  test("getById should catch errors", async () => {
    const req = { params: { id: "1" } };
    const res = mockResponse();

    ClasseService.getById.mockRejectedValue(new Error("DB error"));

    await ClasseController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
  });

  test("create should return 201 with new class", async () => {
    const req = { body: { nom: "6A", prof: "123" } };
    const res = mockResponse();

    ClasseService.create.mockResolvedValue({ _id: "1", nom: "6A" });

    await ClasseController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ _id: "1", nom: "6A" });
  });

  test("create should catch errors", async () => {
    const req = { body: { nom: "6A" } };
    const res = mockResponse();

    ClasseService.create.mockRejectedValue(new Error("DB error"));

    await ClasseController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
  });

  test("update should return updated class", async () => {
    const req = { params: { id: "1" }, body: { nom: "6B" } };
    const res = mockResponse();

    ClasseService.update.mockResolvedValue({ _id: "1", nom: "6B" });

    await ClasseController.update(req, res);

    expect(res.json).toHaveBeenCalledWith({ _id: "1", nom: "6B" });
  });

  test("update should return 404 if class not found", async () => {
    const req = { params: { id: "999" }, body: { nom: "6B" } };
    const res = mockResponse();

    ClasseService.update.mockResolvedValue(null);

    await ClasseController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Classe non trouvée" });
  });

  test("update should catch errors", async () => {
    const req = { params: { id: "1" }, body: { nom: "6B" } };
    const res = mockResponse();

    ClasseService.update.mockRejectedValue(new Error("DB error"));

    await ClasseController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
  });

  test("delete should return success message", async () => {
    const req = { params: { id: "1" } };
    const res = mockResponse();

    ClasseService.delete.mockResolvedValue(true);

    await ClasseController.delete(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: "Classe supprimée" });
  });

  test("delete should return 404 if class not found", async () => {
    const req = { params: { id: "999" } };
    const res = mockResponse();

    ClasseService.delete.mockResolvedValue(null);

    await ClasseController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Classe non trouvée" });
  });

  test("delete should catch errors", async () => {
    const req = { params: { id: "1" } };
    const res = mockResponse();

    ClasseService.delete.mockRejectedValue(new Error("DB error"));

    await ClasseController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
  });
});
