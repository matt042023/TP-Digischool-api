const request = require("supertest");
const app = require("../../src/index");
const matiereService = require("../../src/services/matiereService");

jest.mock("../../src/services/matiereService");
jest.mock("../../src/config/db", () => jest.fn());

describe("MatiereController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /matieres", () => {
    it("devrait retourner toutes les matières avec status 200", async () => {
      const mockMatieres = [
        { _id: "1", nom: "Mathématiques" },
        { _id: "2", nom: "Français" },
      ];
      matiereService.getAll.mockResolvedValue(mockMatieres);

      const response = await request(app).get("/matieres");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockMatieres);
      expect(matiereService.getAll).toHaveBeenCalledTimes(1);
    });

    it("devrait retourner status 500 en cas d'erreur", async () => {
      matiereService.getAll.mockRejectedValue(new Error("Erreur serveur"));

      const response = await request(app).get("/matieres");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Erreur serveur");
    });
  });

  describe("GET /matieres/:id", () => {
    it("devrait retourner une matière par son id avec status 200", async () => {
      const mockMatiere = { _id: "1", nom: "Mathématiques" };
      matiereService.getById.mockResolvedValue(mockMatiere);

      const response = await request(app).get("/matieres/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockMatiere);
      expect(matiereService.getById).toHaveBeenCalledWith("1");
    });

    it("devrait retourner status 404 si la matière n'existe pas", async () => {
      matiereService.getById.mockResolvedValue(null);

      const response = await request(app).get("/matieres/999");

      expect(response.status).toBe(404);
      expect(response.body.error).toContain("trouvée");
    });

    it("devrait retourner status 500 en cas d'erreur", async () => {
      matiereService.getById.mockRejectedValue(new Error("Erreur serveur"));

      const response = await request(app).get("/matieres/1");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Erreur serveur");
    });
  });

  describe("POST /matieres", () => {
    it("devrait créer une matière avec status 201", async () => {
      const newMatiere = { nom: "Mathématiques" };
      const createdMatiere = { _id: "1", ...newMatiere };
      matiereService.create.mockResolvedValue(createdMatiere);

      const response = await request(app).post("/matieres").send(newMatiere);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdMatiere);
      expect(matiereService.create).toHaveBeenCalledWith(newMatiere);
    });

    it("devrait retourner status 400 si données invalides", async () => {
      const invalidMatiere = {};
      matiereService.create.mockRejectedValue(
        new Error("Les champs sont obligatoires")
      );

      const response = await request(app).post("/matieres").send(invalidMatiere);

      expect(response.status).toBe(400);
      expect(response.body.error).toContain("obligatoires");
    });
  });

  describe("PUT /matieres/:id", () => {
    it("devrait mettre à jour une matière avec status 200", async () => {
      const updateData = { nom: "Français" };
      const updatedMatiere = { _id: "1", nom: "Français" };
      matiereService.update.mockResolvedValue(updatedMatiere);

      const response = await request(app).put("/matieres/1").send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedMatiere);
      expect(matiereService.update).toHaveBeenCalledWith("1", updateData);
    });

    it("devrait retourner status 404 si la matière n'existe pas", async () => {
      matiereService.update.mockResolvedValue(null);

      const response = await request(app)
        .put("/matieres/999")
        .send({ nom: "Test" });

      expect(response.status).toBe(404);
      expect(response.body.error).toContain("trouvée");
    });

    it("devrait retourner status 400 en cas d'erreur", async () => {
      matiereService.update.mockRejectedValue(new Error("Erreur de mise à jour"));

      const response = await request(app)
        .put("/matieres/1")
        .send({ nom: "Français" });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Erreur de mise à jour");
    });
  });

  describe("DELETE /matieres/:id", () => {
    it("devrait supprimer une matière avec status 200", async () => {
      matiereService.delete.mockResolvedValue({ _id: "1" });

      const response = await request(app).delete("/matieres/1");

      expect(response.status).toBe(200);
      expect(response.body.message).toContain("supprimée");
      expect(matiereService.delete).toHaveBeenCalledWith("1");
    });

    it("devrait retourner status 404 si la matière n'existe pas", async () => {
      matiereService.delete.mockResolvedValue(null);

      const response = await request(app).delete("/matieres/999");

      expect(response.status).toBe(404);
      expect(response.body.error).toContain("trouvée");
    });

    it("devrait retourner status 500 en cas d'erreur", async () => {
      matiereService.delete.mockRejectedValue(
        new Error("Impossible de supprimer")
      );

      const response = await request(app).delete("/matieres/1");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Impossible de supprimer");
    });
  });
});
