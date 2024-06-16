import { Situation } from './../../domain/entities/situation';
export interface SituationRepository {
    findById(id: number): Promise<Situation | null>;
    findByName(name: string): Promise<Situation | null>;
    save(situation: Situation): Promise<void>;
}
