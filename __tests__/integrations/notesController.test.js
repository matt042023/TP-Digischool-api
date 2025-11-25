const request = require("supertest");
const app = require('../../src/index.js');
const notesService = require('../../src/services/notesService');

jest.mock('../../src/services/notesService');

describe("Tests de la route /notes", function () {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /notes doit retourner la liste des notes', async function () {
    const mockNotes = [
      { _id: '1', valeur: 15, eleveId: 'e1', matiereId: 'm1' },
      { _id: '2', valeur: 12, eleveId: 'e2', matiereId: 'm1' }
    ];
    notesService.getAllNotes.mockResolvedValue(mockNotes);

    const response = await request(app).get('/notes');

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(JSON.parse(JSON.stringify(mockNotes)));
    expect(notesService.getAllNotes).toHaveBeenCalled();
  });

  test('GET /notes/:id doit retourner une note par son ID', async function () {
    const mockNote = { _id: '1', valeur: 15, eleveId: 'e1', matiereId: 'm1' };
    notesService.getNoteById.mockResolvedValue(mockNote);

    const response = await request(app).get('/notes/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(JSON.parse(JSON.stringify(mockNote)));
    expect(notesService.getNoteById).toHaveBeenCalledWith('1');
  });

  test('POST /notes doit créer une nouvelle note', async function () {
    const newNoteData = {
      valeur: 18,
      eleveId: "e1",
      matiereId: "m1"
    };
    const mockCreatedNote = { _id: 'mock_id_987654321', ...newNoteData };

    notesService.createNote.mockResolvedValue(mockCreatedNote);

    const response = await request(app).post('/notes').send(newNoteData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(JSON.parse(JSON.stringify(mockCreatedNote)));
    expect(notesService.createNote).toHaveBeenCalledWith(newNoteData);
  });

  test('PUT /notes/:id doit mettre à jour une note', async function () {
    const updateData = { valeur: 19 };
    const mockUpdatedNote = { _id: '1', valeur: 19, eleveId: 'e1', matiereId: 'm1' };

    notesService.updateNote.mockResolvedValue(mockUpdatedNote);

    const response = await request(app).put('/notes/1').send(updateData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(JSON.parse(JSON.stringify(mockUpdatedNote)));
    expect(notesService.updateNote).toHaveBeenCalledWith('1', updateData);
  });

  test('DELETE /notes/:id doit supprimer une note', async function () {
    notesService.deleteNote.mockResolvedValue();

    const response = await request(app).delete('/notes/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Note supprimée" });
    expect(notesService.deleteNote).toHaveBeenCalledWith('1');
  });

  test('POST /notes doit retourner 500 en cas d\'erreur service', async function () {
    const newNoteData = { valeur: 25 };
    notesService.createNote.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).post('/notes').send(newNoteData);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error', 'Service Error');
  });

  test('GET /notes doit retourner 500 en cas d\'erreur service', async function () {
    notesService.getAllNotes.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).get('/notes');

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error', 'Service Error');
  });

  test('GET /notes/:id doit retourner 500 en cas d\'erreur service', async function () {
    notesService.getNoteById.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).get('/notes/1');

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error', 'Service Error');
  });

  test('PUT /notes/:id doit retourner 500 en cas d\'erreur service', async function () {
    const updateData = { valeur: 25 };
    notesService.updateNote.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).put('/notes/1').send(updateData);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error', 'Service Error');
  });

  test('DELETE /notes/:id doit retourner 500 en cas d\'erreur service', async function () {
    notesService.deleteNote.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).delete('/notes/1');

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error', 'Service Error');
  });
});
