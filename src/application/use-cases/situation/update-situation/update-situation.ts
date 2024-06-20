import { Situation } from '../../../../domain/entities/situation';
import { Either, left, right } from '../../../../domain/errors/either';
import { SituationRepository } from './../../../repositories/situation-repository';

type Response = Either<Error, Situation>;

export interface UpdateSituationProps {
    DESCRIPTION: string;
}

export class UpdateSituation {
    constructor(private situationRepository: SituationRepository) {}

    async execute(id: number, props: UpdateSituationProps): Promise<Response> {
        const result = await this.situationRepository.update(id, props);

        if (result) {
            return right(result);
        }

        return left(new Error('user not update, please check you parameters'));
    }
}
