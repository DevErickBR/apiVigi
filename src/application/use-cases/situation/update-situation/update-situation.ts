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
        if (await this.situationRepository.findById(id)) {
            if (await this.situationRepository.findByName(props.DESCRIPTION)) {
                return left(new Error('description already in use'));
            }
            const result = await this.situationRepository.update(id, props);

            if (result) {
                return right(result);
            }

            return left(
                new Error('situation not update, please check you parameters'),
            );
        }

        return left(new Error('situation not found'));
    }
}
