import { SituationRepository } from '../../../repositories/situation-repository';
import {
    Situation,
    SituationProps,
} from '../../../../domain/entities/situation';
import { Either, left, right } from '../../../../domain/errors/either';

type Response = Either<Error, Situation>;

export class CreateSituation {
    constructor(private situationRepository: SituationRepository) {}

    async execute(props: SituationProps): Promise<Response> {
        if (props.ID_SITUATION) {
            if (await this.situationRepository.findById(props.ID_SITUATION)) {
                return left(new Error('ID already exist'));
            }
        }
        if (await this.situationRepository.findByName(props.DESCRIPTION)) {
            return left(new Error('description already exist'));
        }

        const situation = new Situation(props);

        return right(situation);
    }
}
