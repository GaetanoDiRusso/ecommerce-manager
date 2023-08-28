const tsj = require("ts-json-schema-generator");

const config = {
    path: "index",
    tsconfig: "tsconfig.json",
    type: "GetOrdersResponse",
};

export const GetOrdersResponse = tsj.createGenerator(config).createSchema(config.type).definitions;