import { Request, Response } from "express";
import { TB_LICENCAS } from "../models/TB_LICENCAS";

export const ALL_LICENCAS = async (req: Request, res: Response) => {
    const allLicencas = await TB_LICENCAS.findAll().catch((err) => {
        if (err.name === 'SequelizeConnectionError') {
            res.status(500).json('algo de errado com servidor!, tente novamente em instantes, caso permaneça acione o suporte!')
            return
        } else {
            res.status(400).json('ops! algo errado, verique suaa solitações, caso permaneça, acione o suporte!')
            return
        }
    })

    if (allLicencas) {
        if (allLicencas.length != 0) {
            res.status(200).json(allLicencas)
            return
        } else {
            res.status(404).json('sistema ainda não possui licenças cadastradas!')
            return
        }
    }

};

// ----------------

export const FIND_LICENCA = async (req: Request, res: Response) => {
    const { ID_LICENCA } = req.body;
    if (!ID_LICENCA) {
        res.status(400).json('valores nulos não são aceitos!');
        return
    };

    const findLicenca = await TB_LICENCAS.findByPk(ID_LICENCA).catch((err) => {
        if (err.name === 'SequelizeConnectionError') {
            res.status(500).json('algo de errado com o servidor!, tente novamente em instantes, caso permaneça acione o suporte!');
            return;
        } else {
            res.status(400).json('ops! algo errado, verique suaa solitações, caso permança, acione o suporte!');
            return;
        }
    });

    if (findLicenca) {
        res.status(200).json(findLicenca);
        return;
    } else {
        res.status(404).json('Nenhuma licença encontrada!')
    };
};

// ----------------

export const CRATE_LICENCA = async (req: Request, res: Response) => {
    const { NOME_LICENCA, DURACAO_DIAS } = req.body;
    if (!NOME_LICENCA || !DURACAO_DIAS) {
        res.status(400).json('valores nulos não são aceitos!');
        return;
    };

    const newLicenca = await TB_LICENCAS.create({ NOME_LICENCA, DURACAO_DIAS }).catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json(`a Licenca <|${NOME_LICENCA}|> já está cadastrada no sistema!`);
            return;
        } else {
            res.status(400).json('ops! algo errado, verique sua solitações, caso permaneça, acione o suporte!')
            return;
        };
    });

    if (newLicenca) {
        res.status(201).json('Licenca cadastrada com sucesso!');
        return;
    };
};

// -----------------

export const DEL_LICENCA = async (req: Request, res: Response) => {
    const { ID_LICENCA } = req.body;
    if (!ID_LICENCA) {
        res.status(400).json('valores nulos não são aceitos!');
        return;
    };

    const delLicenca = await TB_LICENCAS.destroy({ where: { ID_LICENCA } }).catch((err) => {
        if (err.name === 'SequelizeForeignKeyConstraintError') {
            res.status(400).json(`a licença não pode ser apagada, pois a mesma já foi utilizada!`);
            return;
        } else {
            res.status(500).json('algo de errado com o servidor, tente novamente mais tarde, caso permaneça entre em contato com o suporte!');
            return;
        };
    });

    if (delLicenca) {
        res.status(200).json('licença deletado com sucesso!');
        return;
    } else {
        res.status(404).json('licença deletada anteriormente!');
        return;
    }
};

// -------------------

export const EDIT_LICENCA = async (req: Request, res: Response) => {
    const { ID_LICENCA, NEW_NOME, DURACAO_DIAS } = req.body;
    if (!ID_LICENCA || !NEW_NOME) {
        res.status(400).json('valores nulos não são aceitos!');
        return;
    };

    const editLicenca = await TB_LICENCAS.update({ NOME_LICENCA: NEW_NOME, DURACAO_DIAS: DURACAO_DIAS }, { where: { ID_LICENCA } }).catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json(`a licença ${NEW_NOME} já está cadastrada no sistema!`)
            return;
        } else {
            res.status(500).json('algo de errado com o servidor, tente novamente mais tarde, caso permaneça entre em contato com o suporte!');
            return;
        };

    });

    if (editLicenca) {
        if (editLicenca[0] > 0) {
            res.status(200).json('licença atualizada com sucesso!');
            return
        } else {
            res.status(400).json('Ops. algo deu errado, verique suas entradas e tente novamente, caso persista, acione o suporte!');
            return
        }
    }
};