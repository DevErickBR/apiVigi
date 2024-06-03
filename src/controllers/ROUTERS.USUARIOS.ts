import { Request, Response } from "express";
import { TB_USUARIOS } from "../models/TB_USUARIOS";

export const ALL_USUARIOS = async (req: Request, res: Response) => {
    const allUsuarios = await TB_USUARIOS.findAll().catch((err) => {
        if (err.name === 'SequelizeConnectionError') {
            res.status(500).json('Banco de dados está fora do ar! por favor acione o suporte!');
            return;
        } else {
            res.status(404);
            return;
        };
    })

    if (allUsuarios) {
        res.status(200).json(allUsuarios);
    } else (
        res.status(404).json('nenhum usuario cadastrado!')
    )
};

export const FIND_USUARIO = async (req: Request, res: Response) => {

    const { ID_USUARIO } = req.body;
    if (!ID_USUARIO) {
        res.status(400).json('valores nulos não são aceitos');
        return
    };

    const findUsuario = await TB_USUARIOS.findByPk(ID_USUARIO).catch((err) => {
        if (err.name === 'SequelizeConnectionError') {
            res.status(500).json('Banco de dados está fora do ar! por favor acione o suporte!');
            return;
        } else {
            res.status(404);
            return;
        };
    });

    if (findUsuario) {
        res.status(200).json(findUsuario);
    } else (
        res.status(404).json('nenhum usuario encontrado!')
    );
};

export const CREATE_USUARIO = async (req: Request, res: Response) => {

    const { NOME, SOBRENOME, EMAIL, ID_GRUPO, ID_SITUACAO, SENHA, ID_LICENCA, ULTIMO_PAGAMENTO_LICENCA } = req.body;
    if (!NOME || !SOBRENOME || !EMAIL || !ID_GRUPO || !ID_LICENCA || !ID_SITUACAO || !ULTIMO_PAGAMENTO_LICENCA || !SENHA) {
        res.status(400).json('valores nulos não são aceitos');
        return
    }

    const newUser = await TB_USUARIOS.create({
        NOME,
        SOBRENOME,
        EMAIL,
        ID_GRUPO,
        ID_LICENCA,
        ID_SITUACAO,
        ULTIMO_PAGAMENTO_LICENCA,
        SENHA
    }).catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json(`email já está cadastrado no sistema!`);
            return
        } else {
            res.status(500).json('algo de errado com o servidor, tente novamente mais tarde, caso permaneça entre em contato com o suporte!');
            return
        };
    });

    if (newUser) {
        res.status(201).json('usuario cadastrado com sucesso!');
    }

};

export const EDIT_DADOS_CLIENTE = async (req: Request, res: Response) => {

    const { ID_USUARIO, NOME, SOBRENOME, EMAIL, ID_GRUPO, ID_LICENCA } = req.body;
    if (!ID_USUARIO || !NOME || !SOBRENOME || !EMAIL || !ID_GRUPO || !ID_LICENCA) {
        res.status(400).json('valores nulos não são aceitos');
        return
    }
    const affectedRows = await TB_USUARIOS.update({
        NOME,
        SOBRENOME,
        EMAIL,
        ID_GRUPO,
        ID_LICENCA
    }, {
        where: { ID_USUARIO }
    }).catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json(`O email já está em uso!`);
            return
        } else {
            res.status(500).json('algo de errado com o servidor, tente novamente mais tarde, caso permaneça entre em contato com o suporte!');
            return
        };
    });
    ;

    if (affectedRows) {
        if (affectedRows[0] == 1) {
            res.status(200).json('usuario atualizado com sucesso!')
            return
        } else {
            res.status(404).json('usuario não encontrado')
        }
    }
}