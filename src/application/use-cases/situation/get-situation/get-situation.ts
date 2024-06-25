import { Situation } from '../../../../domain/entities/situation.ts';
import { Either, left, right } from '../../../../domain/errors/either.ts';
import { SituationRepository } from '../../../repositories/situation-repository.ts';

type Response = Either<Error, Situation>;

export class GetSituation {
    constructor(private situationRepository: SituationRepository) {}

    async getById(id: number): Promise<Response> {
        const response = await this.situationRepository.findById(id);

        if (response) {
            return right(response);
        }

        return left(new Error('Situation not exist with this ID'));
    }

    async getByDescription(description: string): Promise<Response> {
        const response = await this.situationRepository.findByName(description);

        if (response) {
            return right(response);
        }

        return left(new Error('Situation not exist with this description'));
    }
}
