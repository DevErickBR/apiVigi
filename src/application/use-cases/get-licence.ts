import { Licence } from '../../domain/entities/licence';
import { Either, left, right } from '../../domain/errors/either';
import { LicenceRepository } from './../repositories/licence-repository';

type Response = Either<Error, Licence>;

export class GetLicence {
    constructor(private licenceRepository: LicenceRepository) {}

    async getLicence(idLicence: number): Promise<Response> {
        const licence = await this.licenceRepository.findById(idLicence);

        if (licence) {
            return right(licence);
        }

        return left(new Error('licence not exist'));
    }
}
