const tsj = require("ts-json-schema-generator");

const config = {
    path: "index.ts",
    tsconfig: "tsconfig.json",
    type: "InputError",
};

export const InputErrorSchema = tsj.createGenerator(config).createSchema(config.type).definitions;