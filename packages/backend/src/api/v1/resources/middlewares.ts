import { APIErrorResponse, sendError, TypedRequest, TypedResponse } from "../../types";
import { NextFunction } from "express-serve-static-core";
import { ValidationError } from "sequelize";
import * as jwt from "jsonwebtoken";
import Config from "../../../../config/config";
import InvalidSession from "./exception";
import { SessionPayload } from "../../../domain/auth/auth";
import asyncHandler from "express-async-handler";

// Eslint complains about NextFunction not being used, but Express needs it, so it knows it's an error handler.
// eslint-disable-next-line
export const errorHandler = (error: Error, req: TypedRequest, res: TypedResponse<APIErrorResponse>, _: NextFunction) => {
    console.error(error);
    let errorCode = 500;

    switch(error.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
        errorCode = 422;
        error.message = (error as ValidationError).errors ?
            (error as ValidationError).errors.map(e => e.message).join(", ") : error.message;
        break;
    case "DomainException":
        errorCode = 400;
        break;
    case "InvalidSession":
        errorCode = 401;
        break;
    }

    sendError(res, error, errorCode);
};

export const authenticateJWT = asyncHandler((req: TypedRequest, res: TypedResponse<object>, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, Config.AUTH.PRIVATE_KEY, { complete: undefined }, (err, payload): void => {
            if (err) throw new InvalidSession("Provided session token is invalid");
            else {
                req.session = payload as SessionPayload;
                next();
            }
        });
    } else throw new InvalidSession("No session token was provided");
});
