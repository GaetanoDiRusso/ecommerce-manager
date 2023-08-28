const tsj = require("ts-json-schema-generator");

const config = {
    path: "src/auth/domain/entities/AuthResponse",
    tsconfig: "tsconfig.json",
    type: "AuthResponse",
};

export const AuthResponseSchema = tsj.createGenerator(config).createSchema(config.type).definitions;