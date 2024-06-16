import { Licence } from '../../domain/entities/licence';
import { Either, left, right } from '../../domain/errors/either';
import { LicenceRepository } from './../repositories/licence-repository';

type Response = Either<Error, Licence>;

export class GetLicence {
    constructor(private licenceRepository: LicenceRepository) {}

    async getById(id: number): Promise<Response> {
        const result = await this.licenceRepository.findById(id);

        if (result) {
            return right(result);
        }

        return left(new Error('licence not exist with this ID'));
    }

    async getByDescription(description: string): Promise<Response> {
        const result = await this.licenceRepository.findByName(description);

        if (result) {
            return right(result);
        }

        return left(new Error('licence not exist with this description'));
    }
}
