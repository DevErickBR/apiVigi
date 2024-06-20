import { SituationRepository } from '../../application/repositories/situation-repository';
import { UpdateSituationProps } from '../../application/use-cases/situation/update-situation/update-situation';
import { Situation } from '../../domain/entities/situation';

export class InMemorySituationsRepository implements SituationRepository {
    public situations: Situation[] = [];
    async findById(id: number): Promise<Situation | null> {
        const situation = this.situations.find(
            (situation) => situation.id === id,
        );
        return situation ?? null;
    }

    async findByName(name: string): Promise<Situation | null> {
        const situation = this.situations.find(
            (situation) => situation.description === name,
        );

        return situation ?? null;
    }

    async save(situation: Situation): Promise<void> {
        this.situations.push(situation);
    }

    async update(
        id: number,
        propsUpdate: UpdateSituationProps,
    ): Promise<Situation | null> {
        const index = this.situations.findIndex((props) => props.id === id);
        if (index < 0) {
            return null;
        }
        const newSituation = this.situations[index];

        if (propsUpdate.DESCRIPTION)
            newSituation.updateDescription(propsUpdate.DESCRIPTION);

        return newSituation;
    }

    async delete(id: number): Promise<void> {
        this.situations.filter((props) => props.id !== id);
    }
}
