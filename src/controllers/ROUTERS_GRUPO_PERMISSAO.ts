import { Request, Response } from "express";
import { ASSOC_GRUPO_PERMISSAO } from "../models/ASSOC_GRUPO_PERMISSAO";

//pesquisa permissão dos grupos


export const FIND_GRUPOperPERMISSAO = async (req: Request, res: Response) => {
    const { ID_GRUPO } = req.body
    if (!ID_GRUPO) {
        res.status(400).json('valores nulos não são aceitos!')
    }

    const permissoesGrupo = await ASSOC_GRUPO_PERMISSAO.findAll({ where: { ID_GRUPO: ID_GRUPO } }).catch((err) => {
        if (err.name === 'SequelizeConnectionError') {
            res.status(500).json('Banco de dados está fora do ar! por favor acione o suporte!');
            return;
        } else {
            res.status(404);
            return
        }
    })

    if (permissoesGrupo) {
        if (permissoesGrupo.length != 0) {
            res.json(permissoesGrupo)
            return
        }
        res.status(404).json('esse grupo não contem permições')
    }
}

// busca em que grupos a permissao esta associada

export const FIND_PERMISSOESperGRUPO = async (req: Request, res: Response) => {
    const { ID_PERMISSAO } = req.body;
    if (!ID_PERMISSAO) {
        res.status(400).json('valores nulos não são aceitos!');
    };

    const grupoPermissao = await ASSOC_GRUPO_PERMISSAO.findAll({ where: { ID_PERMISSAO: ID_PERMISSAO } }).catch((err) => {
        if (err.name === 'SequelizeConnectionError') {
            res.status(500).json('Banco de dados está fora do ar! por favor acione o suporte!');
            return;
        } else {
            res.status(404);
            return;
        };
    });

    if (grupoPermissao) {
        if (grupoPermissao.length != 0) {
            res.json(grupoPermissao);
            return;
        }
        res.status(404).json('esse permições não contem grupos');
    };

};

export const addGRUPOforPERMISSAO = async (req: Request, res: Response) => {
    const { ID_GRUPO, ID_PERMISSAO } = req.body;
    if (!ID_GRUPO || !ID_PERMISSAO) {
        res.status(400).json('valores nulos não são aceitos!');
    };

    const addGrupoForPermissao = await ASSOC_GRUPO_PERMISSAO.create({ ID_GRUPO, ID_PERMISSAO }).catch((err) => {
        if (err.name === 'SequelizeConnectionError') {
            res.status(500).json('Banco de dados está fora do ar! por favor acione o suporte!');
            return;
        } else {
            res.status(404);
            return;
        }
    });

    if (addGrupoForPermissao) {
        res.status(201).json('Permissão Adicionada Ao Grupo com sucesso!');
    } else {
        res.status(400).json('aconteceu algum problema na associação, verique se o grupo já não tenha essa permissão');
    };

};

export const delPERMISSAOofGRUPO = async (req: Request, res: Response) => {
    const { ID_GRUPO, ID_PERMISSAO } = req.body
    const delPermissaoOfGrupo = await ASSOC_GRUPO_PERMISSAO.destroy({
        where: {
            ID_GRUPO,
            ID_PERMISSAO
        }
    }).catch((err) => {
        if (err.name === 'SequelizeConnectionError') {
            res.status(500).json('Banco de dados está fora do ar! por favor acione o suporte!');
            return;
        } else {
            res.status(404);
            return;
        }
    });

    if (delPermissaoOfGrupo) {
        res.status(200).json(`permissao removida do grupo com sucesso!`);
        return
    }
};