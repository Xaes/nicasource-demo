import express from "express";
import helmet from "helmet";
import compression from "compression";
import V1Router from "./v1/resources/router";

const server = express();

// API Versioning Routers.
server.use("/api/v1", V1Router);

// Enable GZIP compression.
server.use(compression());

// Helmet protects from some well-known web vulnerabilities by setting HTTP headers appropriately.
server.use(helmet());

// Disable Express Fingerprint.
server.disable("x-powered-by");

export default server;
