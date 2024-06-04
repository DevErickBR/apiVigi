import { Request, Response } from "express";
import { ASSOC_USUARIOS_SETORES } from "../models/ASSOC_USUARIOS_SETORES";
import { ASSOC_GRUPO_PERMISSAO } from "../models/ASSOC_GRUPO_PERMISSAO";

// pesquisa usuarios do setor

export const FIND_SETORitsUSUARIOS = async (req: Request, res: Response) => {
    const { ID_SETOR } = req.body
    if (!ID_SETOR) {
        res.status(400).json('valores nulos não são aceitos');
        return
    };

    const usuarioSetor = await ASSOC_USUARIOS_SETORES.findAll({ where: { ID_SETOR } }).catch((err) => {
        if (err.name === 'SequelizeConnectionError') {
            res.status(500).json('Banco de dados está fora do ar! por favor acione o suporte!');
            return;
        } else {
            res.status(404);
            return;
        };
    });

    if (usuarioSetor) {
        if (usuarioSetor.length == 0) {
            res.status(400).json('esse setor não tem usuarios!')
            return
        }
        res.status(200).json(usuarioSetor)
        return
    }
};


// pesquisa setores do usuario

export const FIND_USUARIOitsSETORES = async (req: Request, res: Response) => {
    const { ID_USUARIO } = req.body;
    if (!ID_USUARIO) {
        res.status(400).json('valores nulos não são aceitos');
        return
    };

    const setorUsuarios = await ASSOC_USUARIOS_SETORES.findAll({ where: { ID_USUARIO } }).catch((err) => {
        if (err.name === 'SequelizeConnectionError') {
            res.status(500).json('Banco de dados está fora do ar! por favor acione o suporte!');
            return;
        } else {
            res.status(404);
            return
        }
    })

    if (setorUsuarios) {
        res.status(200).json(setorUsuarios)
        return
    } else {
        res.status(400).json('esse usuario não nenhum setor associado a ele!')
    }
};

//adiciona usuario ao setor


export const addUSUARIOforSetor = async (req: Request, res: Response) => {
    const { ID_SETOR, ID_USUARIO } = req.body;
    if (!ID_SETOR || !ID_USUARIO) {
        res.json(400).json('valores nulos não são aceitos');
        return
    }

    const addUsuarioSetor = await ASSOC_USUARIOS_SETORES.create({ ID_USUARIO, ID_SETOR }).catch((err) => {
        if (err.name === 'SequelizeConnectionError') {
            res.status(500).json('Banco de dados está fora do ar! por favor acione o suporte!');
            return;
        } else {
            res.status(404);
            return;
        }
    });

    if (addUsuarioSetor) {
        res.status(201).json('usuario associado ao setor com sucesso!');
        return;
    } else {
        res.status(400).json('aconteceu algum problema na asssociação, verique se o usuario já não pertence ao Setor!')
        return
    };

}

// remove usuario do setor

export const delUSUARIOofSETOR = async (req: Request, res: Response) => {
    const { ID_USUARIO, ID_SETOR } = req.body;
    if (!ID_SETOR || !ID_USUARIO) {
        res.json(400).json('valores nulos não são aceitos');
        return
    };

    const delUsuarioOfSetor = await ASSOC_USUARIOS_SETORES.destroy({
        where: {
            ID_USUARIO,
            ID_SETOR
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

    if (delUsuarioOfSetor) {
        res.status(200).json('usuario removido do setor com sucesso!')
        return
    } else {
        res.status(400).json('algo de errado aconteceu, tente novamente em instantes, caso permaneça, acione o suporte!')
    }
}