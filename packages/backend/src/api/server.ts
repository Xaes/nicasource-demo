import express from "express";
import helmet from "helmet";
import compression from "compression";
import V1Router from "./v1/resources/router";
import { APIErrorResponse, sendError, TypedRequest, TypedResponse } from "./types";
import { NextFunction } from "express-serve-static-core";
import bodyParser from "body-parser";
import { ValidationError } from "sequelize";

const server = express();

// Enable GZIP compression.
server.use(compression());

// Helmet protects from some well-known web vulnerabilities by setting HTTP headers appropriately.
server.use(helmet());

// Body Parser.
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Disable Express Fingerprint.
server.disable("x-powered-by");

// API Versioning Routers.
server.use("/api/v1", V1Router);

// Custom Error Handler.
// Eslint complains about NextFunction not being used, but Express needs it, so it knows it's an error handler.
// eslint-disable-next-line
server.use((error: Error, req: TypedRequest, res: TypedResponse<APIErrorResponse>, _: NextFunction) => {
    console.log(error);
    const errorCode = error.name === "SequelizeValidationError" ? 422 : 500;
    error.message = (error as ValidationError).errors ?
        (error as ValidationError).errors.map(e => e.message).join(", ") : error.message;
    sendError(res, error, errorCode);
});

export default server;
