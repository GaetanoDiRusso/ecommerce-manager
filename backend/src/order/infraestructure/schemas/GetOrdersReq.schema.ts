import {ZodGetOrdersReq} from '../models/GetOrdersReq.model'
import {generateSchema} from '@anatine/zod-openapi';

export const GetOrdersReqSchema = {
    GetOrdersReq: generateSchema(ZodGetOrdersReq)
};