import { Request, Response } from "express";
import { TB_GRUPOS } from "../models/TB_GRUPOS";

export const ALL_GRUPOS = async (req: Request, res: Response) => {
    const allGrupos = await TB_GRUPOS.findAll()
    res.json(allGrupos)
};
