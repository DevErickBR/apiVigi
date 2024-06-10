import { TB_USUARIOS } from '../models/TB_USUARIOS';
import { TB_LICENCAS } from '../models/TB_LICENCAS';

export default async function DurationLicenca(ID_USUARIO: number) {
    const result = await TB_USUARIOS.findOne({
        where: { ID_USUARIO: ID_USUARIO },
        include: {
            model: TB_LICENCAS,
            as: 'LICENCA',
            attributes: ['DURACAO_DIAS'],
        },
    }).catch((err) => {
        console.log(err);
    });

    if (!result) {
        return 0;
    }

    const duration = result.get({ plain: true });

    return duration.LICENCA.DURACAO_DIAS as number;
}
