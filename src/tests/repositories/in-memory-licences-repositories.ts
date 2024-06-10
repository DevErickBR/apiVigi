import { LicenceRepository } from '../../application/repositories/licence-duration';

import { Licence } from '../../domain/entities/licence';

export class InMemoryLicencesRepository implements LicenceRepository {
    public items: Licence[] = [];

    async findById(id: number): Promise<Licence | null> {
        const licence = this.items.find((licence) => licence.getId === id);

        if (licence == undefined) {
            return null;
        }

        return licence;
    }
}
