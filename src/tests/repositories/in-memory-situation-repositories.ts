import { SituationRepository } from '../../application/repositories/situation-repository';
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
}
