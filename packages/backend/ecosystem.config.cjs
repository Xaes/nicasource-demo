module.exports = {
    apps : [{
        name: "nicasource/backend",
        script: "yarn",
        args: "start-production",
        watch: ".",
        time: true,
        instances: 1,
        autorestart: true,
        max_restarts: 50,
        env: {
            POSTGRES_USER: process.env.PRODUCTION_POSTGRES_USER,
            POSTGRES_PASSWORD: process.env.PRODUCTION_POSTGRES_PASSWORD,
            POSTGRES_DB: process.env.PRODUCTION_POSTGRES_DB,
            POSTGRES_HOST: process.env.PRODUCTION_POSTGRES_HOST,
            POSTGRES_PORT: process.env.PRODUCTION_POSTGRES_PORT,
            PRODUCTION_POSTGRES_USER: process.env.PRODUCTION_POSTGRES_USER,
            PRODUCTION_POSTGRES_PASSWORD: process.env.PRODUCTION_POSTGRES_PASSWORD,
            PRODUCTION_POSTGRES_DB: process.env.PRODUCTION_POSTGRES_DB,
            PRODUCTION_POSTGRES_HOST: process.env.PRODUCTION_POSTGRES_HOST,
            PRODUCTION_POSTGRES_PORT: process.env.PRODUCTION_POSTGRES_PORT,
            AUTH_PRIVATE_KEY: process.env.AUTH_PRIVATE_KEY
        },
    }],
    deploy : {
        production : {
            user: "ubuntu",
            key: "./dev-pem.pem",
            host: "ec2-3-21-93-57.us-east-2.compute.amazonaws.com",
            ref: "origin/master",
            repo: "https://github.com/Xaes/nicasource-demo.git",
            path: "~/",
            "pre-deploy-local": "rm -rf node_modules",
            "post-deploy" : "yarn install && pm2 reload ecosystem.config.cjs --env production",
            "pre-setup": ""
        }
    }
};
