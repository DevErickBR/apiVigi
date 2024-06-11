import { LicenceRepository } from './../repositories/licence-repository';

export class GetLicence {
    constructor(private licenceRepository: LicenceRepository) {}

    async getLicence(idLicence: number) {
        const licence = await this.licenceRepository.findById(idLicence);

        if (licence) {
            return licence;
        }

        return licence;
    }
}
