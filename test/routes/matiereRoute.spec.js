const request = require('supertest');
const express = require('express');
const matiereRoutes = require('../../src/routes/matiereRoutes');
const MatiereService = require('../../src/services/matiereService');

jest.mock('../../src/services/matiereService');

const app = express();
app.use(express.json());
app.use('/matieres', matiereRoutes);

describe('Route /matieres', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('GET / retourne la liste des matières', async () => {
        MatiereService.getAll.mockResolvedValue([{ _id: '1', nom: 'Maths' }]);

        const res = await request(app).get('/matieres');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
    });

    it('GET /:id retourne une matière', async () => {
        MatiereService.getById.mockResolvedValue({ _id: '1', nom: 'Maths' });

        const res = await request(app).get('/matieres/1');
        expect(res.statusCode).toBe(200);
        expect(res.body.nom).toBe('Maths');
    });

    it('GET /:id retourne 404 si non trouvé', async () => {
        MatiereService.getById.mockResolvedValue(null);

        const res = await request(app).get('/matieres/999');
        expect(res.statusCode).toBe(404);
    });

    it('GET /:id retourne 500 si erreur serveur', async () => {
        MatiereService.getById.mockRejectedValue(new Error('Erreur DB'));

        const res = await request(app).get('/matieres/1');
        expect(res.statusCode).toBe(500);
        expect(res.body.error).toBe('Erreur DB');
    });
});
