const MatiereService = require('../../src/services/matiereService');
const MatiereRepository = require('../../src/repositories/matiereRepository');

jest.mock('../../src/repositories/matiereRepository');

describe('MatiereService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('doit retourner une matière par id', async () => {
        const fake = { _id: '1', nom: 'Maths' };
        MatiereRepository.getById.mockResolvedValue(fake);

        const result = await MatiereService.getById('1');
        expect(result).toEqual(fake);
        expect(MatiereRepository.getById).toHaveBeenCalledWith('1');
    });

    it('doit retourner toutes les matières', async () => {
        const list = [{ _id: '1', nom: 'Maths' }, { _id: '2', nom: 'Français' }];
        MatiereRepository.getAll.mockResolvedValue(list);

        const result = await MatiereService.getAll();
        expect(result).toEqual(list);
        expect(MatiereRepository.getAll).toHaveBeenCalled();
    });

    it('doit créer une nouvelle matière', async () => {
        const newMatiere = { _id: '3', nom: 'Histoire' };
        MatiereRepository.create.mockResolvedValue(newMatiere);

        const result = await MatiereService.create({ nom: 'Histoire' });
        expect(result).toEqual(newMatiere);
        expect(MatiereRepository.create).toHaveBeenCalledWith({ nom: 'Histoire' });
    });

    it('doit mettre à jour une matière', async () => {
        const updatedMatiere = { _id: '1', nom: 'Maths Avancé' };
        MatiereRepository.update.mockResolvedValue(updatedMatiere);

        const result = await MatiereService.update('1', { nom: 'Maths Avancé' });
        expect(result).toEqual(updatedMatiere);
        expect(MatiereRepository.update).toHaveBeenCalledWith('1', { nom: 'Maths Avancé' });
    });

    it('doit supprimer une matière', async () => {
        const deletedMatiere = { _id: '1', nom: 'Maths' };
        MatiereRepository.delete.mockResolvedValue(deletedMatiere);

        const result = await MatiereService.delete('1');
        expect(result).toEqual(deletedMatiere);
        expect(MatiereRepository.delete).toHaveBeenCalledWith('1');
    });
});
