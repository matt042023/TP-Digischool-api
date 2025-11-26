const request = require("supertest");
const app = require("../../src/index");
const classeService = require("../../src/services/classeService");

jest.mock("../../src/services/classeService");
jest.mock("../../src/config/db", () => jest.fn());

describe("ClasseController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /classes", () => {
    it("devrait retourner toutes les classes avec status 200", async () => {
      const mockClasses = [
        { _id: "1", nom: "6A", prof: "profId1" },
        { _id: "2", nom: "5B", prof: "profId2" },
      ];
      classeService.getAll.mockResolvedValue(mockClasses);

      const response = await request(app).get("/classes");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockClasses);
      expect(classeService.getAll).toHaveBeenCalledTimes(1);
    });

    it("devrait retourner status 500 en cas d'erreur", async () => {
      classeService.getAll.mockRejectedValue(new Error("Erreur serveur"));

      const response = await request(app).get("/classes");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Erreur serveur");
    });
  });

  describe("GET /classes/:id", () => {
    it("devrait retourner une classe par son id avec status 200", async () => {
      const mockClasse = { _id: "1", nom: "6A", prof: "profId1" };
      classeService.getById.mockResolvedValue(mockClasse);

      const response = await request(app).get("/classes/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockClasse);
      expect(classeService.getById).toHaveBeenCalledWith("1");
    });

    it("devrait retourner status 404 si la classe n'existe pas", async () => {
      classeService.getById.mockResolvedValue(null);

      const response = await request(app).get("/classes/999");

      expect(response.status).toBe(404);
      expect(response.body.error).toContain("trouvée");
    });

    it("devrait retourner status 500 en cas d'erreur", async () => {
      classeService.getById.mockRejectedValue(new Error("Erreur serveur"));

      const response = await request(app).get("/classes/1");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Erreur serveur");
    });
  });

  describe("POST /classes", () => {
    it("devrait créer une classe avec status 201", async () => {
      const newClasse = { nom: "6A", prof: "profId1" };
      const createdClasse = { _id: "1", ...newClasse };
      classeService.create.mockResolvedValue(createdClasse);

      const response = await request(app).post("/classes").send(newClasse);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdClasse);
      expect(classeService.create).toHaveBeenCalledWith(newClasse);
    });

    it("devrait retourner status 400 si données invalides", async () => {
      const invalidClasse = {};
      classeService.create.mockRejectedValue(
        new Error("Les champs sont obligatoires")
      );

      const response = await request(app).post("/classes").send(invalidClasse);

      expect(response.status).toBe(400);
      expect(response.body.error).toContain("obligatoires");
    });
  });

  describe("PUT /classes/:id", () => {
    it("devrait mettre à jour une classe avec status 200", async () => {
      const updateData = { nom: "6B" };
      const updatedClasse = { _id: "1", nom: "6B", prof: "profId1" };
      classeService.update.mockResolvedValue(updatedClasse);

      const response = await request(app).put("/classes/1").send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedClasse);
      expect(classeService.update).toHaveBeenCalledWith("1", updateData);
    });

    it("devrait retourner status 404 si la classe n'existe pas", async () => {
      classeService.update.mockResolvedValue(null);

      const response = await request(app)
        .put("/classes/999")
        .send({ nom: "Test" });

      expect(response.status).toBe(404);
      expect(response.body.error).toContain("trouvée");
    });

    it("devrait retourner status 400 en cas d'erreur", async () => {
      classeService.update.mockRejectedValue(new Error("Erreur de mise à jour"));

      const response = await request(app).put("/classes/1").send({ nom: "6B" });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Erreur de mise à jour");
    });
  });

  describe("DELETE /classes/:id", () => {
    it("devrait supprimer une classe avec status 200", async () => {
      classeService.delete.mockResolvedValue({ _id: "1" });

      const response = await request(app).delete("/classes/1");

      expect(response.status).toBe(200);
      expect(response.body.message).toContain("supprimée");
      expect(classeService.delete).toHaveBeenCalledWith("1");
    });

    it("devrait retourner status 404 si la classe n'existe pas", async () => {
      classeService.delete.mockResolvedValue(null);

      const response = await request(app).delete("/classes/999");

      expect(response.status).toBe(404);
      expect(response.body.error).toContain("trouvée");
    });

    it("devrait retourner status 500 en cas d'erreur", async () => {
      classeService.delete.mockRejectedValue(new Error("Impossible de supprimer"));

      const response = await request(app).delete("/classes/1");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Impossible de supprimer");
    });
  });
});
