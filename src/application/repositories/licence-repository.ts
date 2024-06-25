import { Licence } from '../../domain/entities/licence.ts';
import { UpdateLicenceProps } from '../use-cases/licence/update-licence/update-licence.ts';

export interface LicenceRepository {
    findById(id: number): Promise<Licence | null>;
    findByName(name: string): Promise<Licence | null>;
    save(licence: Licence): Promise<void>;
    update(
        id: number,
        updateProps: UpdateLicenceProps,
    ): Promise<Licence | null>;
    delete(id: number): Promise<void>;
}
