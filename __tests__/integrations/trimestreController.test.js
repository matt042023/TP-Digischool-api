const request = require("supertest");
const app = require('../../src/index.js');
const trimestreService = require('../../src/services/trimestreService');

jest.mock('../../src/services/trimestreService');

describe("Tests de la route /trimestres", function () {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /trimestres doit retourner la liste des trimestres', async function () {
    const mockTrimestres = [
      { _id: '1', nom: 'Trimestre 1', date: '2025-01-01' },
      { _id: '2', nom: 'Trimestre 2', date: '2025-04-01' }
    ];
    trimestreService.getAllTrimestres.mockResolvedValue(mockTrimestres);

    const response = await request(app).get('/trimestres');

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(JSON.parse(JSON.stringify(mockTrimestres)));
    expect(trimestreService.getAllTrimestres).toHaveBeenCalled();
  });

  test('GET /trimestres/:id doit retourner un trimestre par son ID', async function () {
    const mockTrimestre = { _id: '1', nom: 'Trimestre 1', date: '2025-01-01' };
    trimestreService.getTrimestreById.mockResolvedValue(mockTrimestre);

    const response = await request(app).get('/trimestres/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(JSON.parse(JSON.stringify(mockTrimestre)));
    expect(trimestreService.getTrimestreById).toHaveBeenCalledWith('1');
  });

  test('POST /trimestres doit créer un nouveau trimestre', async function () {
    const newTrimestreData = {
      nom: "Trimestre 1",
      date: "2025-11-24T00:00:00.000Z"
    };
    const mockCreatedTrimestre = { _id: 'mock_id_123456789', ...newTrimestreData };

    trimestreService.createTrimestre.mockResolvedValue(mockCreatedTrimestre);

    const response = await request(app).post('/trimestres').send(newTrimestreData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(JSON.parse(JSON.stringify(mockCreatedTrimestre)));
    expect(trimestreService.createTrimestre).toHaveBeenCalledWith(newTrimestreData);
  });

  test('PUT /trimestres/:id doit mettre à jour un trimestre', async function () {
    const updateData = { nom: "Trimestre 1 Modifié" };
    const mockUpdatedTrimestre = { _id: '1', nom: "Trimestre 1 Modifié", date: "2025-11-24T00:00:00.000Z" };

    trimestreService.updateTrimestre.mockResolvedValue(mockUpdatedTrimestre);

    const response = await request(app).put('/trimestres/1').send(updateData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(JSON.parse(JSON.stringify(mockUpdatedTrimestre)));
    expect(trimestreService.updateTrimestre).toHaveBeenCalledWith('1', updateData);
  });

  test('DELETE /trimestres/:id doit supprimer un trimestre', async function () {
    trimestreService.deleteTrimestre.mockResolvedValue();

    const response = await request(app).delete('/trimestres/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Trimestre supprimé" });
    expect(trimestreService.deleteTrimestre).toHaveBeenCalledWith('1');
  });

  test('POST /trimestres doit retourner 500 en cas d\'erreur service', async function () {
    const newTrimestreData = { nom: "Trimestre Error" };
    trimestreService.createTrimestre.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).post('/trimestres').send(newTrimestreData);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error', 'Service Error');
  });

  test('GET /trimestres/:id doit retourner 500 en cas d\'erreur service', async function () {
    trimestreService.getTrimestreById.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).get('/trimestres/1');

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error', 'Service Error');
  });

  test('GET /trimestres doit retourner 500 en cas d\'erreur service', async function () {
    trimestreService.getAllTrimestres.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).get('/trimestres');

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error', 'Service Error');
  });

  test('PUT /trimestres/:id doit retourner 500 en cas d\'erreur service', async function () {
    const updateData = { nom: "Trimestre Error" };
    trimestreService.updateTrimestre.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).put('/trimestres/1').send(updateData);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error', 'Service Error');
  });

  test('DELETE /trimestres/:id doit retourner 500 en cas d\'erreur service', async function () {
    trimestreService.deleteTrimestre.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).delete('/trimestres/1');

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error', 'Service Error');
  });
});