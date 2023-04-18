import { Send } from "express-serve-static-core";
import { Response } from "express";
import { Error } from "sequelize";
import { SessionPayload } from "../domain/auth/auth";
import { IncomingHttpHeaders } from "http";


export interface APIOkResponse<T> {
    data: T | T[];
    statusCode: number;
}

export interface APIErrorResponse {
    errorMessage: string;
    errorName: string;
    statusCode: number;
}

export interface TypedRequest<B = object, P = object> extends Express.Request {
    body: B,
    params: P,
    headers: IncomingHttpHeaders,
    session?: SessionPayload
}

export interface TypedResponse<B> extends Response {
    json: Send<B, this>;
}

export const sendOkResponse = <T>(response: TypedResponse<APIOkResponse<T>>, data: T | T[], status?: number): void => {
    response
        .status(status || 200)
        .json({
            data,
            statusCode: status || 200
        });
};

export const sendError = <T extends Error>(response: TypedResponse<APIErrorResponse>, error: T, status?: number): void => {
    response
        .status(status || 500)
        .json({
            errorName: error.name,
            errorMessage: error.message,
            statusCode: status || 500
        });
};
