import { Request, Response } from "express";
import { TB_DEF_DOCUMENTOS } from "../models/TB_DEF_DOCUMENTOS";

export const ALL_DEF_DOCUMENTOS = async (req: Request, res: Response) => {
    const allDefDocumentos = await TB_DEF_DOCUMENTOS.findAll().catch((err) => {
        if (err.name === 'SequelizeConnectionError') {
            res.status(500).json('Banco de dados está fora do ar! por favor acione o suporte!');
            return;
        } else {
            res.status(404).json('algo de errado aconteceu, tente novamente em instantes, caso permaneça, acione o suporte!');
            return
        }
    })

    if (allDefDocumentos) {
        if (allDefDocumentos.length > 0) {
            res.status(200).json(allDefDocumentos);
            return;
        } else {
            res.status(404).json('sistema ainda não possui tipos de documentos cadastrados!')
            return
        };
    }
};

// ------------------

export const FIND_DEF_DOCUMENTO = async (req: Request, res: Response) => {
    const { ID_DEF_DOCUMENTO } = req.body;

    if (!ID_DEF_DOCUMENTO) {
        res.status(400).json('valores nulos não são aceitos');
        return;
    };

    const findDefDocumento = await TB_DEF_DOCUMENTOS.findByPk(ID_DEF_DOCUMENTO).catch((err) => {
        if (err.name === 'SequelizeConnectionError') {
            res.status(500).json('Banco de dados está fora do ar! por favor acione o suporte!');
            return;
        } else {
            res.status(404).json('sistema ainda não possui grupos cadastrados!')
            return
        }
    })

    if (findDefDocumento) {
        res.status(200).json(findDefDocumento);
        return;
    } else {
        res.status(404).json('nenhum resultado encontrado!');
        return;
    };
};

// ------------------------

export const CREATE_DEF_DOCUMENTO = async (req: Request, res: Response) => {
    const { DEF_DOCUMENTO } = req.body;
    if (!DEF_DOCUMENTO) {
        res.status(400).json('valores nulos não são aceitos');
        return;
    };

    const newDefDocumento = await TB_DEF_DOCUMENTOS.create({ DEF_DOCUMENTO }).catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json(`o tipo <|${DEF_DOCUMENTO}|> já está cadastrado no sistema!`);
            return;
        } else {
            res.status(500).json('algo de errado com o servidor, tente novamente mais tarde, caso permaneça entre em contato com o suporte!');
            return;
        };
    });

    if (newDefDocumento) {
        res.status(201).json('tipo de documento cadastrado com sucesso!');
        return;
    };
};

// --------------------------

export const DELETE_DEF_DOCUMENTO = async (req: Request, res: Response) => {
    const { ID_DEF_DOCUMENTO } = req.body;
    if (!ID_DEF_DOCUMENTO) {
        res.status(400).json('valores nulos não são aceitos');
        return;
    };

    const delDefDocumento = await TB_DEF_DOCUMENTOS.destroy({ where: { ID_DEF_DOCUMENTO } }).catch((err) => {
        if (err.name === 'SequelizeForeignKeyConstraintError') {
            res.status(400).json(`o tipo de documento não pode ser apagado, pois o mesmo já foi utilizado!`);
            return;
        } else {
            res.status(500).json('algo de errado com o servidor, tente novamente mais tarde, caso permaneça entre em contato com o suporte!');
            return;
        };
    });

    if (delDefDocumento) {
        res.status(200).json('tipo de documento deletado com sucesso!');
        return
    } else {
        res.status(404).json('tipo de documento deletado anteriomente!');
    }
};