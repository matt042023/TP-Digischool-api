const ClasseService = require('../../src/services/classeService');
const ClasseRepository = require('../../src/repositories/classeRepository');

jest.mock('../../src/repositories/classeRepository');

describe('ClasseService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('doit retourner une classe par id', async () => {
        const fake = { _id: '1', nom: '6A' };
        ClasseRepository.getById.mockResolvedValue(fake);

        const result = await ClasseService.getById('1');
        expect(result).toEqual(fake);
        expect(ClasseRepository.getById).toHaveBeenCalledWith('1');
    });

    it('doit retourner toutes les classes', async () => {
        const list = [{ _id: '1', nom: '6A' }, { _id: '2', nom: '6B' }];
        ClasseRepository.getAll.mockResolvedValue(list);

        const result = await ClasseService.getAll();
        expect(result).toEqual(list);
        expect(ClasseRepository.getAll).toHaveBeenCalled();
    });

    it('doit créer une nouvelle classe', async () => {
        const newClasse = { _id: '3', nom: '6C' };
        ClasseRepository.create.mockResolvedValue(newClasse);

        const result = await ClasseService.create({ nom: '6C' });
        expect(result).toEqual(newClasse);
        expect(ClasseRepository.create).toHaveBeenCalledWith({ nom: '6C' });
    });

    it('doit mettre à jour une classe', async () => {
        const updatedClasse = { _id: '1', nom: '6A modifiée' };
        ClasseRepository.update.mockResolvedValue(updatedClasse);

        const result = await ClasseService.update('1', { nom: '6A modifiée' });
        expect(result).toEqual(updatedClasse);
        expect(ClasseRepository.update).toHaveBeenCalledWith('1', { nom: '6A modifiée' });
    });

    it('doit supprimer une classe', async () => {
        const deletedClasse = { _id: '1', nom: '6A' };
        ClasseRepository.delete.mockResolvedValue(deletedClasse);

        const result = await ClasseService.delete('1');
        expect(result).toEqual(deletedClasse);
        expect(ClasseRepository.delete).toHaveBeenCalledWith('1');
    });
});
