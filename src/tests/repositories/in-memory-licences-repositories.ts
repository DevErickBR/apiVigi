import { Licence } from './../../domain/entities/licence';
import { LicenceRepository } from '../../application/repositories/licence-repository';

export class InMemoryLicencesRepository implements LicenceRepository {
    public licences: Licence[] = [];

    async findById(id: number): Promise<Licence | null> {
        const newLicence = new Licence({
            DURATION_DAYS: 30,
            ID_LICENCE: 99,
            NAME_LICENCE: 'test',
        });
        this.licences.push(newLicence);
        const licence = this.licences.find((licence) => licence.id === id);

        if (licence) {
            return licence;
        }

        return null;
    }

    async findByName(name: string): Promise<Licence | null> {
        const licence = this.licences.find((licence) => licence.name === name);
        if (licence) {
            return licence;
        }

        return null;
    }

    async save(licence: Licence): Promise<void> {
        this.licences.push(licence);
    }
}
