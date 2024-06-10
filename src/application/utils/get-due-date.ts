import { LicenceRepository } from './../repositories/licence-duration';

export interface DueDateProps {
    dueDate: Date;
}

export class FindDueDate {
    constructor(private licenceRepository: LicenceRepository) {}

    async calcDueDate(
        startDate: Date,
        idLicence: number,
    ): Promise<string | null> {
        const date = new Date(startDate);
        const licence = await this.licenceRepository.findById(idLicence);

        if (licence) {
            date.setDate(date.getDate() + licence.getDuration);

            const result = date.toJSON().slice(0, 10);

            if (date <= startDate) {
                throw new Error('Due Date Invalid');
            }

            return result;
        }

        throw new Error('values null not accept');
    }
}
