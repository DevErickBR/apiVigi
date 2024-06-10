import { LicenceRepository } from '../repositories/licence-duration';
import { Licence } from '../../domain/entities/licence';

export interface GetLicenceRequest {
    ID_LICENCA: number;
    NOME_LICENCA?: string;
    DURACAO_DIAS?: number;
}

type GetLicenceResponse = Promise<Licence | null>;

export class GetLicence {
    constructor(private licenceRepository: LicenceRepository) {}

    async execute(props: GetLicenceRequest): GetLicenceResponse {
        const licence = await this.licenceRepository.findById(props.ID_LICENCA);

        if (licence) {
            return licence;
        }

        throw new Error('no license found for this id');
    }
}
