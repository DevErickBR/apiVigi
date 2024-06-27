import { LicenceRepository } from '../../application/repositories/licence-repository.ts';
import { Licence } from '../../domain/entities/licence.ts';
import { LicenceModel } from '../../models/licenceModel.ts';
import { UpdateLicenceProps } from '../../application/use-cases/licence/update-licence/update-licence.ts';

export class SequelizeLicenceRepository implements LicenceRepository {
    private toDomain(licenceModel: LicenceModel) {
        return new Licence(licenceModel);
    }

    async findById(id: number): Promise<Licence | null> {
        const licenceModel = await LicenceModel.findByPk(id);
        if (licenceModel) {
            const licence = this.toDomain(licenceModel);
            return licence;
        }
        return null;
    }

    async findByName(name: string): Promise<Licence | null> {
        const licenceModel = await LicenceModel.findOne({
            where: { LICENCE: name },
        });
        if (licenceModel) {
            const licence = this.toDomain(licenceModel);
            return licence;
        }
        return null;
    }

    async delete(id: number): Promise<void> {
        await LicenceModel.destroy({ where: { ID_LICENCE: id } });
    }

    async update(
        id: number,
        updateProps: UpdateLicenceProps,
    ): Promise<Licence | null> {
        const licenceModel = await LicenceModel.findByPk(id);
        if (licenceModel) {
            await licenceModel.update(updateProps);
            return this.toDomain(licenceModel);
        }

        return null;
    }

    async save(licence: Licence): Promise<void> {
        const licenceModel = LicenceModel.build({
            ID_LICENCE: licence.id,
            LICENCE: licence.name,
            DURATION_DAYS: licence.duration,
        } as LicenceModel);

        await licenceModel.save();
    }
}
