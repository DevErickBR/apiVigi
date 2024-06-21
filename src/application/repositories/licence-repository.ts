import { Licence } from '../../domain/entities/licence';
import { UpdateLicenceProps } from '../use-cases/licence/update-licence/update-licence';

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
