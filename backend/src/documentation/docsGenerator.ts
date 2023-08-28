import 'dotenv/config';
const swaggerAutogen = require('swagger-autogen');

// Auth
import {LoginReqSchema} from 'src/auth/infraestructure/schemas';
import {AuthResponseSchema} from 'src/auth/infraestructure/schemas/authResponse.schema';
// Order
import { GetOrdersResponse } from 'src/order/infraestructure/schemas/GetOrdersResponse.schema';
import { GetOrdersReqSchema } from 'src/order/infraestructure/schemas/GetOrdersReq.schema';
// Utils
import {InputErrorSchema} from 'src/schemas/InputError.schema';
import {CustomErrorSchema} from 'src/schemas/CustomError.schema';

import { develop } from 'src/config';

const schemasDefinitions = {
  // Auth
  ...LoginReqSchema,
  ...AuthResponseSchema,

  // Order
  ...GetOrdersResponse,
  ...GetOrdersReqSchema,

  // Utils
  ...InputErrorSchema,
  ...CustomErrorSchema,
};

const port = process.env.PORT || 3000;
const serverBaseUrl = process.env.SERVER_BASE_URL ?? `localhost:${port}`;
const schemes = develop ? ['http'] : ['https'];

const swaggerOptions = {
  info: {
    title: 'Ecommerce Manager',
    version: '1.0.0',
  },
  schemes,
  host: serverBaseUrl,
  '@definitions': {
    ...schemasDefinitions,
  },
};

const swagger = new swaggerAutogen();

const entryRoutesDirs = ['./index.ts'];
const outDocDir = './swagger-doc.json';

swagger(outDocDir, entryRoutesDirs, swaggerOptions);
