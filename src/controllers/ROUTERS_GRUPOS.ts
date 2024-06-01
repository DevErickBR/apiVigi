import { Request, Response } from "express";
import { TB_GRUPOS } from "../models/TB_GRUPOS";

// realiza a busca de todos os grupos

export const ALL_GRUPOS = async (req: Request, res: Response) => {
    const allGrupos = await TB_GRUPOS.findAll().catch((err) => {
        if (err.name === 'SequelizeConnectionError') {
            res.status(500).json('Banco de dados está fora do ar! por favor acione o suporte!');
            return;
        } else {
            res.status(404);
            return
        }
    })
    if (allGrupos) {
        res.status(200).json(allGrupos);
    };
};

// realiza a busca de um grupo especifico

export const FIND_GRUPO = async (req: Request, res: Response) => {

    const { ID_GRUPO } = req.body;
    if (!ID_GRUPO) {
        res.status(400).json('valores nulos não são aceitos');
        return;
    };

    const grupo = await TB_GRUPOS.findByPk(ID_GRUPO);
    if (grupo) {
        res.status(200).json(grupo);
        return;
    } else {
        res.status(404).json('nenhum resultado encontrado!');
    };
};

// realiza o cadastro de um grupo

export const CREATE_GRUPO = async (req: Request, res: Response) => {

    const { NOME_GRUPO } = req.body;
    if (!NOME_GRUPO) {
        res.status(400).json('valores nulos não são aceitos');
        return;
    }

    const newGrupo = await TB_GRUPOS.create({ NOME_GRUPO }).catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json(`grupo <|${NOME_GRUPO}|> já está cadastrado no sistema!`);
            return;
        } else {
            res.status(500).json('algo de errado com o servidor, tente novamente mais tarde, caso permaneça entre em contato com o suporte!');
            return;
        };
    });

    if (newGrupo) {
        res.status(201).json('grupo cadastrado com sucesso');
    };
};

// realiza a ação de deletar um grupo!

export const DELETE_GRUPO = async (req: Request, res: Response) => {

    const { ID_GRUPO } = req.body;
    if (!ID_GRUPO) {
        res.status(400).json('valores nulos não são aceitos');
        return;
    };

    const dropGrupo = await TB_GRUPOS.destroy({ where: { ID_GRUPO } }).catch((err) => {
        if (err.name === 'SequelizeForeignKeyConstraintError') {
            res.status(400).json(`o grupo não pode ser apagado, pois o mesmo já foi utilizado!`);
            return;
        } else {
            res.status(500).json('algo de errado com o servidor, tente novamente mais tarde, caso permaneça entre em contato com o suporte!');
            return;
        };
    });
    if (dropGrupo) {
        res.status(200).json('grupo deletado com sucesso!');
        return;
    };
};

// realiza a edicao de um grupo

export const EDIT_GRUPO = async (req: Request, res: Response) => {
    const { ID_GRUPO, NOME_GRUPO } = req.body
    if (!ID_GRUPO && !NOME_GRUPO) {
        res.status(400).json('valores nulos não são aceitos');
        return
    }
    const updateGrupo = await TB_GRUPOS.update({ NOME_GRUPO }, { where: { ID_GRUPO } }).catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json(`o nome <|${NOME_GRUPO}|> já foi utilizado, tente outro!`)
            return
        } else {
            res.status(500).json('algo de errado com o servidor, tente novamente mais tarde, caso permaneça entre em contato com o suporte!');
            return;
        }
    })

    if (updateGrupo) {
        res.status(200).json('grupo atualizado com sucesso!')
    }
}