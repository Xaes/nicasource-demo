import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "node",
    rootDir: "./tests/",
    testMatch: ["**.test.ts"],
    transform: {
        ".(ts|tsx)": "ts-jest"
    }
};

export default config;