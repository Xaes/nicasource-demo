import express from "express";
import helmet from "helmet";
import compression from "compression";
import V1Router from "./v1/resources/router";
import bodyParser from "body-parser";
import { errorHandler } from "./v1/resources/middlewares";

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
server.use(errorHandler);

export default server;
