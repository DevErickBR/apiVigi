import { Licence } from './../../domain/entities/licence.ts';
import { LicenceRepository } from '../../application/repositories/licence-repository.ts';
import { UpdateLicenceProps } from '../../application/use-cases/licence/update-licence/update-licence.ts';

export class InMemoryLicencesRepository implements LicenceRepository {
    public licences: Licence[] = [];

    async findById(id: number): Promise<Licence | null> {
        const newLicence = new Licence({
            DURATION_DAYS: 30,
            ID_LICENCE: 99,
            LICENCE: 'test',
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

    async update(
        id: number,
        updateProps: UpdateLicenceProps,
    ): Promise<Licence | null> {
        const index = this.licences.findIndex((props) => props.id === id);

        if (index < 0) {
            return null;
        }

        const licence = this.licences[index];

        if (updateProps.NAME_LICENCE)
            licence.updateDescription(updateProps.NAME_LICENCE);
        if (updateProps.DURATION_DAYS)
            licence.updateDuration(updateProps.DURATION_DAYS);

        return licence;
    }

    async delete(id: number): Promise<void> {
        this.licences.filter((props) => props.id !== id);
    }
}
