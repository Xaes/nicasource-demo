const dotenv = require("dotenv");
dotenv.config({ path: `${process.cwd()}/.env`});

module.exports = {
    apps : [{
        name: "nicasource/backend",
        script: "dist/src/main.js",
        watch: false,
        time: true,
        instances: 1,
        autorestart: true,
        max_restarts: 50,
        node_args: "--es-module-specifier-resolution=node",
        env_production: {
            POSTGRES_USER: process.env.PRODUCTION_POSTGRES_USER,
            POSTGRES_PASSWORD: process.env.PRODUCTION_POSTGRES_PASSWORD,
            POSTGRES_DB: process.env.PRODUCTION_POSTGRES_DB,
            POSTGRES_HOST: process.env.PRODUCTION_POSTGRES_HOST,
            POSTGRES_PORT: process.env.PRODUCTION_POSTGRES_PORT,
            AUTH_PRIVATE_KEY: process.env.AUTH_PRIVATE_KEY,
            PRODUCTION_POSTGRES_USER: process.env.PRODUCTION_POSTGRES_USER,
            PRODUCTION_POSTGRES_PASSWORD: process.env.PRODUCTION_POSTGRES_PASSWORD,
            PRODUCTION_POSTGRES_DB: process.env.PRODUCTION_POSTGRES_DB,
            PRODUCTION_POSTGRES_HOST: process.env.PRODUCTION_POSTGRES_HOST,
            PRODUCTION_POSTGRES_PORT: process.env.PRODUCTION_POSTGRES_PORT,
            "NODE_ENV": "production",
        },
    }],
    deploy : {
        production : {
            user: "ubuntu",
            key: "dev-pem.pem",
            host: "3.22.179.39",
            ref: "origin/main",
            repo: "https://github.com/Xaes/nicasource-demo.git",
            path: "/home/ubuntu/nicasource-demo",
            "pre-deploy-local": "./deployenvs.sh",
            "post-deploy" : "rm -rf node_modules && cd packages/backend/ && yarn install && yarn build && yarn migrate-prod:up && pm2 reload ecosystem.config.cjs --env production",
        }
    }
};
