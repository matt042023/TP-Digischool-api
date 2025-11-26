const request = require("supertest");
const app = require("../../src/index");
const trimestreService = require("../../src/services/trimestreService");

jest.mock("../../src/services/trimestreService");
jest.mock("../../src/config/db", () => jest.fn());

describe("TrimestreController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /trimestres", () => {
    it("devrait retourner tous les trimestres avec status 200", async () => {
      const mockTrimestres = [
        { _id: "1", nom: "Trimestre 1", date: "2025-01-01" },
        { _id: "2", nom: "Trimestre 2", date: "2025-04-01" },
      ];
      trimestreService.getAllTrimestres.mockResolvedValue(mockTrimestres);

      const response = await request(app).get("/trimestres");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTrimestres);
      expect(trimestreService.getAllTrimestres).toHaveBeenCalledTimes(1);
    });

    it("devrait retourner status 500 en cas d'erreur", async () => {
      trimestreService.getAllTrimestres.mockRejectedValue(
        new Error("Erreur serveur")
      );

      const response = await request(app).get("/trimestres");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Erreur serveur");
    });
  });

  describe("GET /trimestres/:id", () => {
    it("devrait retourner un trimestre par son id avec status 200", async () => {
      const mockTrimestre = {
        _id: "1",
        nom: "Trimestre 1",
        date: "2025-01-01",
      };
      trimestreService.getTrimestreById.mockResolvedValue(mockTrimestre);

      const response = await request(app).get("/trimestres/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTrimestre);
      expect(trimestreService.getTrimestreById).toHaveBeenCalledWith("1");
    });

    it("devrait retourner status 500 en cas d'erreur", async () => {
      trimestreService.getTrimestreById.mockRejectedValue(
        new Error("Erreur serveur")
      );

      const response = await request(app).get("/trimestres/1");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Erreur serveur");
    });
  });

  describe("POST /trimestres", () => {
    it("devrait créer un trimestre avec status 201", async () => {
      const newTrimestreData = {
        nom: "Trimestre 1",
        date: "2025-11-24T00:00:00.000Z",
      };
      const mockCreatedTrimestre = {
        _id: "mock_id_123456789",
        ...newTrimestreData,
      };
      trimestreService.createTrimestre.mockResolvedValue(mockCreatedTrimestre);

      const response = await request(app)
        .post("/trimestres")
        .send(newTrimestreData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockCreatedTrimestre);
      expect(trimestreService.createTrimestre).toHaveBeenCalledWith(
        newTrimestreData
      );
    });

    it("devrait retourner status 500 en cas d'erreur", async () => {
      const newTrimestreData = { nom: "Trimestre Error" };
      trimestreService.createTrimestre.mockRejectedValue(
        new Error("Erreur serveur")
      );

      const response = await request(app)
        .post("/trimestres")
        .send(newTrimestreData);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Erreur serveur");
    });
  });

  describe("PUT /trimestres/:id", () => {
    it("devrait mettre à jour un trimestre avec status 200", async () => {
      const updateData = { nom: "Trimestre 1 Modifié" };
      const mockUpdatedTrimestre = {
        _id: "1",
        nom: "Trimestre 1 Modifié",
        date: "2025-11-24T00:00:00.000Z",
      };
      trimestreService.updateTrimestre.mockResolvedValue(mockUpdatedTrimestre);

      const response = await request(app)
        .put("/trimestres/1")
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUpdatedTrimestre);
      expect(trimestreService.updateTrimestre).toHaveBeenCalledWith(
        "1",
        updateData
      );
    });

    it("devrait retourner status 500 en cas d'erreur", async () => {
      const updateData = { nom: "Trimestre Error" };
      trimestreService.updateTrimestre.mockRejectedValue(
        new Error("Erreur serveur")
      );

      const response = await request(app)
        .put("/trimestres/1")
        .send(updateData);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Erreur serveur");
    });
  });

  describe("DELETE /trimestres/:id", () => {
    it("devrait supprimer un trimestre avec status 200", async () => {
      trimestreService.deleteTrimestre.mockResolvedValue();

      const response = await request(app).delete("/trimestres/1");

      expect(response.status).toBe(200);
      expect(response.body.message).toContain("supprimé");
      expect(trimestreService.deleteTrimestre).toHaveBeenCalledWith("1");
    });

    it("devrait retourner status 500 en cas d'erreur", async () => {
      trimestreService.deleteTrimestre.mockRejectedValue(
        new Error("Erreur serveur")
      );

      const response = await request(app).delete("/trimestres/1");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Erreur serveur");
    });
  });
});
