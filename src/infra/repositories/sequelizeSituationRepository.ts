import { SituationRepository } from '../../application/repositories/situation-repository';
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
}
