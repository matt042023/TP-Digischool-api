const request = require("supertest");
const app = require("../../src/index");
const professeurService = require("../../src/services/professeurService");

jest.mock("../../src/services/professeurService");
jest.mock("../../src/config/db", () => jest.fn());

describe("ProfesseurController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /professeurs", () => {
    it("devrait retourner tous les professeurs avec status 200", async () => {
      const mockProfesseurs = [
        { _id: "1", nom: "Leroy", sexe: "M" },
        { _id: "2", nom: "Bernard", sexe: "F" },
      ];
      professeurService.getAll.mockResolvedValue(mockProfesseurs);

      const response = await request(app).get("/professeurs");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProfesseurs);
      expect(professeurService.getAll).toHaveBeenCalledWith(undefined);
    });

    it("devrait retourner le professeur d'une classe avec status 200", async () => {
      const mockProfesseur = [{ _id: "1", nom: "Leroy", sexe: "M" }];
      professeurService.getAll.mockResolvedValue(mockProfesseur);

      const response = await request(app).get("/professeurs?classe=classId1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProfesseur);
      expect(professeurService.getAll).toHaveBeenCalledWith("classId1");
    });

    it("devrait retourner status 500 si la classe n'existe pas", async () => {
      professeurService.getAll.mockRejectedValue(new Error("Classe introuvable"));

      const response = await request(app).get("/professeurs?classe=invalidId");

      expect(response.status).toBe(500);
      expect(response.body).toMatchObject({ message: "Classe introuvable" });
    });

    it("devrait retourner status 500 en cas d'erreur", async () => {
      professeurService.getAll.mockRejectedValue(new Error("Erreur serveur"));

      const response = await request(app).get("/professeurs");

      expect(response.status).toBe(500);
      expect(response.body).toMatchObject({ message: "Erreur serveur" });
    });
  });

  describe("GET /professeurs/:id", () => {
    it("devrait retourner un professeur par son id avec status 200", async () => {
      const mockProf = { _id: "1", nom: "Leroy", sexe: "M" };
      professeurService.getById.mockResolvedValue(mockProf);

      const response = await request(app).get("/professeurs/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProf);
      expect(professeurService.getById).toHaveBeenCalledWith("1");
    });

    it("devrait retourner status 404 si le professeur n'existe pas", async () => {
      professeurService.getById.mockRejectedValue(
        new Error("Professeur introuvable")
      );

      const response = await request(app).get("/professeurs/999");

      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({ message: expect.stringContaining("introuvable") });
    });
  });

  describe("POST /professeurs", () => {
    it("devrait créer un professeur avec status 201", async () => {
      const newProf = { nom: "Moreau", sexe: "F" };
      const createdProf = { _id: "3", ...newProf };
      professeurService.create.mockResolvedValue(createdProf);

      const response = await request(app).post("/professeurs").send(newProf);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdProf);
      expect(professeurService.create).toHaveBeenCalledWith(newProf);
    });

    it("devrait retourner status 400 si données invalides", async () => {
      const invalidProf = { sexe: "M" };
      professeurService.create.mockRejectedValue(
        new Error("Les champs sont obligatoires")
      );

      const response = await request(app).post("/professeurs").send(invalidProf);

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({ message: expect.stringContaining("obligatoires") });
    });
  });

  describe("PUT /professeurs/:id", () => {
    it("devrait mettre à jour un professeur avec status 200", async () => {
      const updateData = { nom: "Leroy-Dupont" };
      const updatedProf = { _id: "1", nom: "Leroy-Dupont", sexe: "M" };
      professeurService.update.mockResolvedValue(updatedProf);

      const response = await request(app).put("/professeurs/1").send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedProf);
      expect(professeurService.update).toHaveBeenCalledWith("1", updateData);
    });

    it("devrait retourner status 404 si le professeur n'existe pas", async () => {
      professeurService.update.mockRejectedValue(
        new Error("Impossible de mettre à jour")
      );

      const response = await request(app)
        .put("/professeurs/999")
        .send({ nom: "Test" });

      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({ message: expect.stringContaining("Impossible") });
    });
  });

  describe("DELETE /professeurs/:id", () => {
    it("devrait supprimer un professeur avec status 200", async () => {
      professeurService.delete.mockResolvedValue({ _id: "1" });

      const response = await request(app).delete("/professeurs/1");

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({ message: expect.stringContaining("supprim") });
      expect(professeurService.delete).toHaveBeenCalledWith("1");
    });

    it("devrait retourner status 404 si le professeur n'existe pas", async () => {
      professeurService.delete.mockRejectedValue(
        new Error("Impossible de supprimer")
      );

      const response = await request(app).delete("/professeurs/999");

      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({ message: expect.stringContaining("Impossible") });
    });
  });
});
