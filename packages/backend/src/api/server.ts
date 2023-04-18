import express from "express";
import helmet from "helmet";
import compression from "compression";

const server = express();

// Enable GZIP compression.
server.use(compression());

// Helmet protects from some well-known web vulnerabilities by setting HTTP headers appropriately.
server.use(helmet());

// Disable Express Fingerprint.
server.disable("x-powered-by");

export default server;
