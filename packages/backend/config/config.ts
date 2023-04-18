import * as dotenv from "dotenv";
dotenv.config();

export default {
    DB: {
        HOST: process.env.POSTGRES_HOST || "localhost",
        USER: process.env.POSTGRES_USER || "postgres",
        PASSWORD: process.env.POSTGRES_PASSWORD || "postgres",
        PORT: process.env.POSTGRES_PORT ? Number.parseInt(process.env.POSTGRES_PORT) : 5432,
        NAME: process.env.POSTGRES_DB || "nicasource",
        POOL_MAX: process.env.POSTGRES_POOL_MAX ? Number.parseInt(process.env.POSTGRES_POOL_MAX) : 5
    },
    API: {
        PORT: process.env.API_PORT || 8000
    }
};
