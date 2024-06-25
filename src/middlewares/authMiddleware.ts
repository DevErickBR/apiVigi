import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
dotenv.config();

type TokenPayload = {
    id: string;
    iat: number;
    exp: number;
};

export function AuthMiddware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json('Token not provided');
    }

    const [, token] = authorization.split(' ');

    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY as string);
        const { id } = decode as TokenPayload;
        req.userId = id;
        next();
    } catch (error) {
        return res.status(401).json('Token Invalid');
    }
}
