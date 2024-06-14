import { LicenceRepository } from './../repositories/licence-repository';
import { Licence } from '../../domain/entities/licence';

interface CreateLicenceRequest {
    ID_LICENCE?: number;
    NAME_LICENCE: string;
    DURATION_DAYS: number;
}

type CreateLicenceResponse = Promise<Licence>;

export class CreateLicence {
    constructor(private licenceRepository: LicenceRepository) {}

    async execute(props: CreateLicenceRequest): CreateLicenceResponse {
        if (props.ID_LICENCE) {
            if (await this.licenceRepository.findById(props.ID_LICENCE)) {
                throw new Error('ID already exist');
            }
        }

        if (props.NAME_LICENCE) {
            if (await this.licenceRepository.findByName(props.NAME_LICENCE)) {
                throw new Error('the license name already exists');
            }
        }

        if (props.DURATION_DAYS < 0) {
            throw new Error(
                'not possible create Licence with duration smaller 0',
            );
        }

        const id = props.ID_LICENCE || undefined;
        const licence = new Licence({ ID_LICENCE: id, ...props });

        return licence;
    }
}
