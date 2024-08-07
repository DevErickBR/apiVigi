import { LicenceRepository } from '../../../repositories/licence-repository.ts';
import { Licence } from '../../../../domain/entities/licence.ts';
import { Either, left, right } from '../../../../domain/errors/either.ts';

interface CreateLicenceRequest {
    ID_LICENCE?: number;
    LICENCE: string;
    DURATION_DAYS: number;
}

type CreateLicenceResponse = Licence;

type Response = Either<Error, CreateLicenceResponse>;

export class CreateLicence {
    constructor(private licenceRepository: LicenceRepository) {}

    async execute(props: CreateLicenceRequest): Promise<Response> {
        if (props.ID_LICENCE) {
            if (await this.licenceRepository.findById(props.ID_LICENCE)) {
                return left(new Error('ID already exist'));
            }
        }

        if (props.LICENCE) {
            if (await this.licenceRepository.findByName(props.LICENCE)) {
                return left(new Error('the license name already exists'));
            }
        }

        if (props.DURATION_DAYS < 0) {
            return left(
                new Error(
                    'not possible create Licence with duration smaller 0',
                ),
            );
        }

        const id = props.ID_LICENCE || undefined;
        const licence = new Licence({ ID_LICENCE: id, ...props });
        this.licenceRepository.save(licence);
        return right(licence);
    }
}
