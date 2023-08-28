import {z, TypeOf} from 'zod';
import {parseZodSchema} from 'src/helpers/zod.helpers';

import {extendApi} from '@anatine/zod-openapi';

export const ZodGetOrdersReq = z.object({
  filter: extendApi(z.object({
    status: z.enum(["approved", "cancel", "delivery", "traveling"]).optional(),
    shippingPromiseDateFrom: z.number().optional(),
    shippingPromiseDateTo: z.number().optional(),
    createDateFrom: z.number().optional(),
    createDateTo: z.number().optional(),
  }), {
    example: {
      status: "approved",
      shippingPromiseDateFrom: 1692986532002,
      shippingPromiseDateTo: 1692986532002,
      createDateFrom: 1692986532002,
      createDateTo: 1692986532002,
    },
  }).optional(),
});

export type GetOrdersReq = TypeOf<typeof ZodGetOrdersReq>;

export const parseGetOrdersReq = (getOrdersReq: any) =>
  parseZodSchema<GetOrdersReq>(ZodGetOrdersReq, getOrdersReq);