import { Response, Request } from "express";
import { TB_SITUACOES } from "../models/TB_SITUACOES";

export const FIND_SITUACOES = async (res: Response, req: Request) => {
    const allSituacoes = await TB_SITUACOES.findAll().catch((err) => {
        res.status(500).json('algo de errado aconteceu, tente novamente mais tarde, caso permancesa, acione o suporte!')
        return
    })

    if (allSituacoes) {
        res.status(200).json(allSituacoes)
    }
};

// ---

export const CREATE_SITUACOES = async (res: Response, req: Request) => {
    const { SITUACAO } = req.body;
    if (!SITUACAO) {
        res.status(400).json('valores nulos não são aceitos');
    };

    const newSituacao = await TB_SITUACOES.create({ SITUACAO }).catch((err) => {
        if (err.name == 'SequelizeUniqueConstraintError') {
            res.status(400).json(`a situacao <|${SITUACAO}|> já está cadastrado no sistema.`);
            return
        } else {
            res.status(500).json('algo de errado aconteceu, tente novamente mais tarde, caso permancesa, acione o suporte!');
            return
        }
    })

    if (newSituacao) {
        res.status(201).json('situação cadastrada no sistema com sucesso!')
    }
};

// ---

export const DEL_SITUACOES = async (res: Response, req: Request) => {
    const { ID_SITUACAO } = req.body;
    if (!ID_SITUACAO) {
        res.status(400).json('valores nulos não são aceitos')
        return
    }

    const delSituacao = await TB_SITUACOES.destroy({ where: { ID_SITUACAO } }).catch((err) => {
        if (err.name === 'SequelizeForeignKeyConstraintError') {
            res.status(400).json(`o grupo não pode ser apagado, pois o mesmo já foi utilizado!`);
            return;
        } else {
            res.status(500).json('algo de errado com o servidor, tente novamente mais tarde, caso permaneça entre em contato com o suporte!');
            return;
        };
    });

    if (delSituacao) {
        res.status(200).json('situação deletado com sucesso!');
        return;
    } else {
        res.status(404).json('situação näo existe');
    };
};