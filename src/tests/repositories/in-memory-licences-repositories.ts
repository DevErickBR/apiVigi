import { LicenceRepository } from '../../application/repositories/licence-repository';

import { Licence } from '../../domain/entities/licence';

export class InMemoryLicencesRepository implements LicenceRepository {
    public licences: Licence[] = [];

    async findById(id: number): Promise<Licence | Error> {
        const licence = this.licences.find((licence) => licence.id === id);

        if (licence == undefined) {
            throw new Error('dont exist License');
        }

        return licence;
    }
}
