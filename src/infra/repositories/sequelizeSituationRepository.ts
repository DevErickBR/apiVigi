import { SituationRepository } from '../../application/repositories/situation-repository';
import { UpdateSituationProps } from '../../application/use-cases/situation/update-situation/update-situation';
import { Situation } from '../../domain/entities/situation';
import { SituationModel } from '../../models/situationModel';

export class SequelizeSituationRepository implements SituationRepository {
    private toDomain(situationModel: SituationModel) {
        return new Situation(situationModel);
    }

    async findById(id: number): Promise<Situation | null> {
        const situationModel = await SituationModel.findByPk(id);
        if (situationModel) {
            const situation = this.toDomain(situationModel);
            return situation;
        }
        return null;
    }

    async findByName(name: string): Promise<Situation | null> {
        const situationModel = await SituationModel.findOne({ where: { DESCRIPTION: name } })
        if (situationModel) {
            return this.toDomain(situationModel)
        }

        return null
    }

    async delete(id: number): Promise<void> {
        await SituationModel.destroy({ where: { ID_SITUATION: id } })
    }

    async save(situation: Situation): Promise<void> {
        const situationModel = SituationModel.build({
            ID_SITUATION: situation.id,
            DESCRIPTION: situation.description
        } as SituationModel)

        await situationModel.save()
    }

    async update(id: number, propsUpdate: UpdateSituationProps): Promise<Situation | null> {
        const situationModel = await SituationModel.findByPk(id)
        if (!situationModel) {
            return null
        }
        await situationModel.update(propsUpdate)
        return this.toDomain(situationModel)
    }
}
