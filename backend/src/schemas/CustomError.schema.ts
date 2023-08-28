const tsj = require("ts-json-schema-generator");

const config = {
    path: "index.ts",
    tsconfig: "tsconfig.json",
    type: "CustomError",
};

export const CustomErrorSchema = tsj.createGenerator(config).createSchema(config.type).definitions;