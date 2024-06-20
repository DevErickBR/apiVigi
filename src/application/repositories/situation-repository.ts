import { UpdateSituationProps } from '../use-cases/situation/update-situation/update-situation';
import { Situation } from './../../domain/entities/situation';
export interface SituationRepository {
    findById(id: number): Promise<Situation | null>;
    findByName(name: string): Promise<Situation | null>;
    update(
        id: number,
        propsUpdate: UpdateSituationProps,
    ): Promise<Situation | null>;
    delete(id: number): Promise<void>;
    save(situation: Situation): Promise<void>;
}
