import { APIErrorResponse, sendError, TypedRequest, TypedResponse } from "../../types";
import { NextFunction } from "express-serve-static-core";
import { ValidationError } from "sequelize";
import InvalidSession from "./exception";
import Auth from "../../../domain/auth/auth";
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

export const secured = asyncHandler((req: TypedRequest, res: TypedResponse<object>, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const parts = authHeader.split(" ");
        const token = parts && parts.length === 2 ? parts[1] : "";
        Auth.verifyAccessToken(token).then((payload) => {
            req.session = payload;
            next();
        }).catch((error) => {
            const err = error as Error;
            throw new InvalidSession(`Access session token is invalid: ${err?.message}`);
        });

        /*
        jwt.verify(token, Config.AUTH.PRIVATE_KEY, { complete: undefined }, (err, payload): void => {
            if (err) throw new InvalidSession("Provided session token is invalid");
            else {
                req.session = payload as SessionPayload;
                next();
            }
        });
        */
    } else throw new InvalidSession("No access token was provided");
});
