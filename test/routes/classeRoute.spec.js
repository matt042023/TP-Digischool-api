const request = require('supertest');
const express = require('express');
const classeRoutes = require('../../src/routes/classeRoutes');
const ClasseService = require('../../src/services/classeService');

jest.mock('../../src/services/classeService');

const app = express();
app.use(express.json());
app.use('/classes', classeRoutes);

describe('Route /classes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('GET / retourne la liste des classes', async () => {
        ClasseService.getAll.mockResolvedValue([{ _id: '1', nom: '6A' }]);

        const res = await request(app).get('/classes');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
    });

    it('GET /:id retourne une classe', async () => {
        ClasseService.getById.mockResolvedValue({ _id: '1', nom: '6A' });

        const res = await request(app).get('/classes/1');
        expect(res.statusCode).toBe(200);
        expect(res.body.nom).toBe('6A');
    });

    it('GET /:id retourne 404 si non trouvé', async () => {
        ClasseService.getById.mockResolvedValue(null);

        const res = await request(app).get('/classes/999');
        expect(res.statusCode).toBe(404);
    });

    it('GET /:id retourne 500 si erreur serveur', async () => {
        ClasseService.getById.mockRejectedValue(new Error('Erreur DB'));

        const res = await request(app).get('/classes/1');
        expect(res.statusCode).toBe(500);
        expect(res.body.error).toBe('Erreur DB');
    });
});
