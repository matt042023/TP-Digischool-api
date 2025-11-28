const request = require("supertest");
const app = require("../../src/index");
const notesService = require("../../src/services/notesService");

jest.mock("../../src/services/notesService");
jest.mock("../../src/config/db", () => jest.fn());

describe("NotesController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /notes", () => {
    it("devrait retourner toutes les notes avec status 200", async () => {
      const mockNotes = [
        { _id: "1", valeur: 15, eleveId: "e1", matiereId: "m1" },
        { _id: "2", valeur: 12, eleveId: "e2", matiereId: "m1" },
      ];
      notesService.getAllNotes.mockResolvedValue(mockNotes);

      const response = await request(app).get("/notes");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockNotes);
      expect(notesService.getAllNotes).toHaveBeenCalledTimes(1);
    });

    it("devrait retourner status 500 en cas d'erreur", async () => {
      notesService.getAllNotes.mockRejectedValue(new Error("Erreur serveur"));

      const response = await request(app).get("/notes");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Erreur serveur");
    });
  });

  describe("GET /notes/:id", () => {
    it("devrait retourner une note par son id avec status 200", async () => {
      const mockNote = { _id: "1", valeur: 15, eleveId: "e1", matiereId: "m1" };
      notesService.getNoteById.mockResolvedValue(mockNote);

      const response = await request(app).get("/notes/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockNote);
      expect(notesService.getNoteById).toHaveBeenCalledWith("1");
    });

    it("devrait retourner status 500 en cas d'erreur", async () => {
      notesService.getNoteById.mockRejectedValue(new Error("Erreur serveur"));

      const response = await request(app).get("/notes/1");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Erreur serveur");
    });
  });

  describe("POST /notes", () => {
    it("devrait créer une note avec status 201", async () => {
      const newNoteData = {
        valeur: 18,
        eleveId: "e1",
        matiereId: "m1",
      };
      const mockCreatedNote = { _id: "mock_id_987654321", ...newNoteData };
      notesService.createNote.mockResolvedValue(mockCreatedNote);

      const response = await request(app).post("/notes").send(newNoteData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockCreatedNote);
      expect(notesService.createNote).toHaveBeenCalledWith(newNoteData);
    });

    it("devrait retourner status 500 en cas d'erreur", async () => {
      const newNoteData = { valeur: 25 };
      notesService.createNote.mockRejectedValue(new Error("Erreur serveur"));

      const response = await request(app).post("/notes").send(newNoteData);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Erreur serveur");
    });
  });

  describe("PUT /notes/:id", () => {
    it("devrait mettre à jour une note avec status 200", async () => {
      const updateData = { valeur: 19 };
      const mockUpdatedNote = {
        _id: "1",
        valeur: 19,
        eleveId: "e1",
        matiereId: "m1",
      };
      notesService.updateNote.mockResolvedValue(mockUpdatedNote);

      const response = await request(app).put("/notes/1").send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUpdatedNote);
      expect(notesService.updateNote).toHaveBeenCalledWith("1", updateData);
    });

    it("devrait retourner status 500 en cas d'erreur", async () => {
      const updateData = { valeur: 25 };
      notesService.updateNote.mockRejectedValue(new Error("Erreur serveur"));

      const response = await request(app).put("/notes/1").send(updateData);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Erreur serveur");
    });
  });

  describe("DELETE /notes/:id", () => {
    it("devrait supprimer une note avec status 200", async () => {
      notesService.deleteNote.mockResolvedValue();

      const response = await request(app).delete("/notes/1");

      expect(response.status).toBe(200);
      expect(response.body.message).toContain("supprimée");
      expect(notesService.deleteNote).toHaveBeenCalledWith("1");
    });

    it("devrait retourner status 500 en cas d'erreur", async () => {
      notesService.deleteNote.mockRejectedValue(new Error("Erreur serveur"));

      const response = await request(app).delete("/notes/1");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Erreur serveur");
    });
  });

  describe("GET /notes/eleve/:eleveId", () => {
  it("devrait retourner les notes d'un élève avec status 200", async () => {
    const eleveId = "e1";
    const mockNotesEleve = [
      { _id: "n1", matiere: "Maths", note: 15, avis: "Bien" },
      { _id: "n2", matiere: "Français", note: 12, avis: "Peut mieux faire" },
    ];
    notesService.getNotesByEleve = jest.fn().mockResolvedValue(mockNotesEleve);

    const response = await request(app).get(`/notes/eleve/${eleveId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockNotesEleve);
    expect(notesService.getNotesByEleve).toHaveBeenCalledWith(eleveId);
  });

  it("devrait retourner status 500 en cas d'erreur", async () => {
    const eleveId = "e1";
    notesService.getNotesByEleve = jest.fn().mockRejectedValue(new Error("Erreur serveur"));

    const response = await request(app).get(`/notes/eleve/${eleveId}`);

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Erreur serveur");
  });
});

});
