import { Request, Response } from "express";
import { CreateUser } from "../application/use-cases/user/create-user/create-user";
import { SequelizeUserRepository } from "../infra/repositories/sequelizeUserRepository";
import { SequelizeLicenceRepository } from "../infra/repositories/sequelizeLicenceRepository";
import { SequelizeSituationRepository } from "../infra/repositories/sequelizeSituationRepository";


export async function CreateUserController(req: Request, res: Response) {
    const { NAME, LASTNAME, EMAIL, PASSWORD, ID_SITUATION, ID_LICENCE, LASTED_PAYMENT } = req.body
    const usersRepo = new SequelizeUserRepository()
    const licenceRepo = new SequelizeLicenceRepository()
    const situationRepo = new SequelizeSituationRepository()
    const createUser = new CreateUser(usersRepo, licenceRepo, situationRepo)
    const newUser = await createUser.execute({
        NAME,
        EMAIL,
        ID_LICENCE,
        ID_SITUATION,
        LASTED_PAYMENT,
        LASTNAME,
        PASSWORD
    })

    if (newUser.isRight()) {
        await usersRepo.save(newUser.value)
        res.status(201).json({
            status: 'sucess',
            msg: 'user registered sucessfully'
        })
    }

    if (newUser.isLeft()) {
        res.status(400).json({
            status: 'error',
            msg: newUser.value.message
        })
    }
}