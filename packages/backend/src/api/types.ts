import { Send } from "express-serve-static-core";
import { Response } from "express";


export interface APIResponse<T> {
    data: T | T[];
    statusCode: number;
}

export interface TypedRequest<B = object, P = object> extends Express.Request {
    body: B,
    params: P
}

export interface TypedResponse<B> extends Response {
    json: Send<B, this>;
}

export const sendOkResponse = <T>(response: TypedResponse<APIResponse<T>>, data: T | T[], status?: number): void => {
    response
        .status(200)
        .json({
            data,
            statusCode: status || 200
        });
};
