import { Request, Response } from "express";
import { TB_SETORES } from "../models/TB_SETORES";

export const ALL_SETORES = async (req: Request, res: Response) => {
    const allSetores = await TB_SETORES.findAll().catch((err) => {
        if (err.name === 'SequelizeConnectionError') {
            res.status(500).json('algo de errado com o servidor!, tente novamente em instantes, caso permaneça acione o suporte!')
            return
        } else {
            res.status(400).json('ops! algo errado, verique suaa solitações, caso permaneça, acione o suporte!')
            return
        }
    });

    if (allSetores) {
        if (allSetores.length != 0) {
            res.status(200).json(allSetores);
            return
        } else {
            res.status(404).json('sistema ainda não tem setores cadastrados!');
            return
        };
    };
};

// --------

export const FIND_SETOR = async (req: Request, res: Response) => {
    const { ID_SETOR } = req.body;
    if (!ID_SETOR) {
        res.status(400).json('valores nulos não são aceitos');
        return
    }

    const findSetor = await TB_SETORES.findByPk(ID_SETOR).catch((err) => {
        if (err.name === 'SequelizeConnectionError') {
            res.status(500).json('algo de errado com o servidor!, tente novamente em instantes, caso permaneça acione o suporte!')
            return
        } else {
            res.status(400).json('ops! algo errado, verique suaa solitações, caso permaneça, acione o suporte!')
            return
        }
    })

    if (findSetor) {
        res.status(200).json(findSetor);
        return

    } else {
        res.status(404).json('nenhum setor encontrado!');
        return
    };
};

// --------

export const CREATE_SETOR = async (req: Request, res: Response) => {
    const { NOME_SETOR } = req.body;
    if (!NOME_SETOR) {
        res.status(400).json('valores nulos não são aceitos');
        return
    }

    const newSetor = await TB_SETORES.create({ NOME_SETOR }).catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json(`o setor <|${NOME_SETOR}|> já está cadastrado no sistema!`);
            return
        } else {
            res.status(500).json('algo de errado com o servidor!, tente novamente em instantes, caso permaneça acione o suporte!')
            return
        }
    })

    if (newSetor) {
        res.status(201).json('setor cadastrado com sucesso!');
    }
};

// --------

export const DEL_SETOR = async (req: Request, res: Response) => {
    const { ID_SETOR } = req.body
    if (!ID_SETOR) {
        res.status(400).json('valores nulos não são aceitos');
        return
    }

    const delSetor = await TB_SETORES.destroy({ where: { ID_SETOR } }).catch((err) => {
        if (err.name === 'SequelizeForeignKeyConstraintError') {
            res.status(400).json(`o setor não pode ser apagado, pois o mesmo já foi utilizado!`);
            return;
        } else {
            res.status(500).json('algo de errado com o servidor, tente novamente mais tarde, caso permaneça entre em contato com o suporte!');
            return;
        };
    });

    if (delSetor) {
        res.status(200).json('setor deletado com sucesso!');
        return
    } else {
        res.status(404).json('setor ja apagado anteriomente');
    }
};

// ----------

export const EDIT_SETOR = async (req: Request, res: Response) => {
    const { ID_SETOR, NEW_NOME } = req.body
    if (!ID_SETOR || !NEW_NOME) {
        res.status(400).json('valores nulos não são aceitos');
        return
    }

    const editSetor = await TB_SETORES.update({ NOME_SETOR: NEW_NOME },
        { where: { ID_SETOR } }).catch((err) => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(400).json(`o setor ${NEW_NOME} já está cadastrado no sistema!`)
                return;
            } else {
                res.status(500).json('algo de errado com o servidor, tente novamente mais tarde, caso permaneça entre em contato com o suporte!');
                return;
            }
        });

    if (editSetor) {
        if (editSetor[0] > 0) {
            res.status(200).json('setor atualizado com sucesso!');
            return
        } else {
            res.status(400).json('Ops. algo deu errado, verique suas entradas e tente novamente, caso persista, acione o suporte!');
            return
        }
    }
};