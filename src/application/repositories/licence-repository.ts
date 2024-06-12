import { Licence } from '../../domain/entities/licence';

export interface LicenceRepository {
    findById(id: number): Promise<Licence | null>;
}
