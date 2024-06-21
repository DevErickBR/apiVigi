import { Licence } from '../../../../domain/entities/licence';
import { Either, left, right } from '../../../../domain/errors/either';
import { LicenceRepository } from './../../../repositories/licence-repository';

export interface UpdateLicenceProps {
    NAME_LICENCE?: string;
    DURATION_DAYS?: number;
}

type Response = Either<Error, Licence>;

export class UpdateLicence {
    constructor(private licenceRepository: LicenceRepository) {}

    async execute(
        id: number,
        updateProps: UpdateLicenceProps,
    ): Promise<Response> {
        if (await this.licenceRepository.findById(id)) {
            if (updateProps.NAME_LICENCE) {
                if (
                    await this.licenceRepository.findByName(
                        updateProps.NAME_LICENCE,
                    )
                ) {
                    return left(new Error('description already in use'));
                }
            }
            if (updateProps.DURATION_DAYS) {
                if (updateProps.DURATION_DAYS < 0) {
                    return left(
                        new Error(
                            'duration invalid! duration less than 0 not accept',
                        ),
                    );
                }
            }
            const result = await this.licenceRepository.update(id, updateProps);

            if (result) {
                return right(result);
            }

            return left(
                new Error('licence not update, please, check you parameters'),
            );
        }

        return left(new Error('licence not fould'));
    }
}
