import {z, TypeOf} from 'zod';
import {parseZodSchema} from 'src/helpers/zod.helpers';

import {extendApi} from '@anatine/zod-openapi';

export const ZodLoginReq = z.object({
  email: extendApi(z.string(), {
    example: 'example@email.com',
  }),
  password: extendApi(z.string(), {
    example: 'abcd1234',
  }),
});

export type LoginReq = TypeOf<typeof ZodLoginReq>;

export const parseLoginReq = (loginReq: any) =>
  parseZodSchema<LoginReq>(ZodLoginReq, loginReq);