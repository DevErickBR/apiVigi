import { Request, Response } from "express";
import { TB_PERMISSOES } from '../models/TB_PERMISSOES';

// realiza busca de todas as permissoes

export const ALL_PERMISSOES = async (req: Request, res: Response) => {
    const allPermissoes = await TB_PERMISSOES.findAll().catch((err) => {
        if (err.name === 'SequelizeConnectionError') {
            res.status(500).json('Banco de dados está fora do ar! por favor acione o suporte!');
            return;
        } else {
            res.status(404);
            return
        }
    })

    if (allPermissoes) {
        res.status(200).json(allPermissoes)
    }
};