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
            return;
        };
    })

    if (allPermissoes) {
        res.status(200).json(allPermissoes);
    };
};

// realiza busca de um grupo especifico

export const FIND_PERMISSAO = async (req: Request, res: Response) => {
    const { ID_PERMISSAO } = req.body
    if (!ID_PERMISSAO) {
        res.status(400).json('valores nulos não são aceitos');
        return;
    };

    const permissao = await TB_PERMISSOES.findByPk(ID_PERMISSAO).catch((err) => {
        if (err.name === 'SequelizeConnectionError') {
            res.status(500).json('Banco de dados está fora do ar! por favor acione o suporte!');
            return;
        } else {
            res.status(404);
            return;
        };
    });
    if (permissao) {
        res.status(200).json(permissao);
        return;
    } else {
        res.status(404).json('nenhum resultado encontrado!');
    };
};

// realiza o cadastro de uma permissao

export const CREATE_PERMISSAO = async (req: Request, res: Response) => {
    const { DESC_PERMISSAO } = req.body;
    if (!DESC_PERMISSAO) {
        res.status(400).json('valores nulos não são aceitos');
        return;
    };

    const newPermissao = await TB_PERMISSOES.create({ DESC_PERMISSAO }).catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json(`a permissão <|${DESC_PERMISSAO}|> já está cadastrada no sistema!`);
            return;
        } else {
            res.status(500).json('algo de errado com o servidor, tente novamente mais tarde, caso permaneça entre em contato com o suporte!');
            return;
        };
    });

    if (newPermissao) {
        res.status(201).json('permissao cadastrada com sucesso!')
    }
};

// realiza a ação de deletar uma permissão

export const DELETE_PERMISSAO = async (req: Request, res: Response) => {
    const { ID_PERMISSAO } = req.body;
    if (!ID_PERMISSAO) {
        res.status(400).json('valores nulos não são aceitos');
        return;
    };

    const dropPermissao = await TB_PERMISSOES.destroy({ where: { ID_PERMISSAO } }).catch((err) => {
        if (err.name === 'SequelizeForeignKeyConstraintError') {
            res.status(400).json(`a permisão não pode ser apagada, pois a mesma já foi utilizada!`);
            return;
        } else {
            res.status(500).json('algo de errado com o servidor, tente novamente mais tarde, caso permaneça entre em contato com o suporte!');
            return;
        };
    });

    if (dropPermissao) {
        res.status(200).json('permissão deletada com sucesso!');
    } else {
        res.status(404).json('permissão não encontrada!')
    }
};

// realiza a acão de editar uma permissão

export const EDIT_PERMISSAO = async (req: Request, res: Response) => {
    const { ID_PERMISSAO, DESC_PERMISSAO } = req.body
    if (!ID_PERMISSAO || !DESC_PERMISSAO) {
        res.status(400).json('valores nulos não são aceitos');
        return
    }
    const updatePermissao = await TB_PERMISSOES.update({ DESC_PERMISSAO }, { where: { ID_PERMISSAO } }).catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json(`o nome <|${DESC_PERMISSAO}|> já foi utilizado, tente outro!`)
            return
        } else {
            res.status(500).json('algo de errado com o servidor, tente novamente mais tarde, caso permaneça entre em contato com o suporte!');
            return;
        }
    });

    if (updatePermissao) {
        res.status(200).json('permissão atualizada com sucesso!')
    } else {
        res.status(404).json('permissão não encontrado!')
    }
}; 