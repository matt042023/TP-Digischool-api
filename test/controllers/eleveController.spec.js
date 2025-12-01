const request = require("supertest");
const app = require("../../src/index");
const eleveService = require("../../src/services/eleveService");

jest.mock("../../src/services/eleveService");
jest.mock("../../src/config/db", () => jest.fn());

describe("EleveController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /eleves", () => {
    it("devrait retourner tous les eleves avec status 200", async () => {
      const mockEleves = [
        { _id: "1", nom: "Dupont", sexe: "M", classe: "classId1" },
        { _id: "2", nom: "Martin", sexe: "F", classe: "classId2" },
      ];
      eleveService.getAll.mockResolvedValue(mockEleves);

      const response = await request(app).get("/eleves");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEleves);
      expect(eleveService.getAll).toHaveBeenCalledWith(false);
    });

    it("devrait retourner les eleves groupés par classe avec status 200", async () => {
      const mockElevesGrouped = [
        {
          classeId: "classId1",
          classeNom: "CP",
          total: 2,
          eleves: [
            { _id: "1", nom: "Dupont", sexe: "M" },
            { _id: "2", nom: "Martin", sexe: "F" },
          ],
        },
        {
          classeId: "classId2",
          classeNom: "CE1",
          total: 1,
          eleves: [{ _id: "3", nom: "Durand", sexe: "M" }],
        },
      ];
      eleveService.getAll.mockResolvedValue(mockElevesGrouped);

      const response = await request(app).get("/eleves?groupByClasse=true");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockElevesGrouped);
      expect(eleveService.getAll).toHaveBeenCalledWith(true);
    });

    it("devrait retourner status 500 en cas d'erreur", async () => {
      eleveService.getAll.mockRejectedValue(new Error("Erreur serveur"));

      const response = await request(app).get("/eleves");

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Erreur serveur");
    });
  });

  describe("GET /eleves/:id", () => {
    it("devrait retourner un eleve par son id avec status 200", async () => {
      const mockEleve = { _id: "1", nom: "Dupont", sexe: "M", classe: "classId1" };
      eleveService.getById.mockResolvedValue(mockEleve);

      const response = await request(app).get("/eleves/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEleve);
      expect(eleveService.getById).toHaveBeenCalledWith("1");
    });

    it("devrait retourner status 404 si l'eleve n'existe pas", async () => {
      eleveService.getById.mockRejectedValue(new Error("Eleve introuvable"));

      const response = await request(app).get("/eleves/999");

      expect(response.status).toBe(404);
      expect(response.body.message).toContain("introuvable");
    });
  });

  describe("POST /eleves", () => {
    it("devrait creer un eleve avec status 201", async () => {
      const newEleve = { nom: "Durand", sexe: "M", classe: "classId1" };
      const createdEleve = { _id: "3", ...newEleve };
      eleveService.create.mockResolvedValue(createdEleve);

      const response = await request(app).post("/eleves").send(newEleve);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdEleve);
      expect(eleveService.create).toHaveBeenCalledWith(newEleve);
    });

    it("devrait retourner status 400 si donnees invalides", async () => {
      const invalidEleve = { sexe: "M" };
      eleveService.create.mockRejectedValue(
        new Error("Les champs sont obligatoires")
      );

      const response = await request(app).post("/eleves").send(invalidEleve);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("obligatoires");
    });
  });

  describe("PUT /eleves/:id", () => {
    it("devrait mettre a jour un eleve avec status 200", async () => {
      const updateData = { nom: "Dupont-Martin" };
      const updatedEleve = { _id: "1", nom: "Dupont-Martin", sexe: "M", classe: "classId1" };
      eleveService.update.mockResolvedValue(updatedEleve);

      const response = await request(app).put("/eleves/1").send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedEleve);
      expect(eleveService.update).toHaveBeenCalledWith("1", updateData);
    });

    it("devrait retourner status 404 si l'eleve n'existe pas", async () => {
      eleveService.update.mockRejectedValue(new Error("Impossible de mettre a jour"));

      const response = await request(app).put("/eleves/999").send({ nom: "Test" });

      expect(response.status).toBe(404);
      expect(response.body.message).toContain("Impossible");
    });
  });

  describe("DELETE /eleves/:id", () => {
    it("devrait supprimer un eleve avec status 200", async () => {
      eleveService.delete.mockResolvedValue({ _id: "1" });

      const response = await request(app).delete("/eleves/1");

      expect(response.status).toBe(200);
      expect(response.body.message).toContain("supprim");
      expect(eleveService.delete).toHaveBeenCalledWith("1");
    });

    it("devrait retourner status 404 si l'eleve n'existe pas", async () => {
      eleveService.delete.mockRejectedValue(new Error("Impossible de supprimer"));

      const response = await request(app).delete("/eleves/999");

      expect(response.status).toBe(404);
      expect(response.body.message).toContain("Impossible");
    });
  });

  describe("GET /eleves/classe/:classeId", () => {
  it("devrait retourner la liste des élèves d'une classe avec status 200", async () => {
    const classeId = "classId1";
    const mockElevesClasse = [
      { _id: "1", nom: "Dupont", prenom: "Jean", classe: classeId },
      { _id: "2", nom: "Martin", prenom: "Julie", classe: classeId },
    ];
    eleveService.getByClasse = jest.fn().mockResolvedValue(mockElevesClasse);

    const response = await request(app).get(`/eleves/classe/${classeId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockElevesClasse);
    expect(eleveService.getByClasse).toHaveBeenCalledWith(classeId);
  });

  it("devrait retourner status 500 en cas d'erreur", async () => {
    const classeId = "classId1";
    eleveService.getByClasse = jest.fn().mockRejectedValue(new Error("Erreur serveur"));

    const response = await request(app).get(`/eleves/classe/${classeId}`);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Erreur serveur");
  });
});

});
