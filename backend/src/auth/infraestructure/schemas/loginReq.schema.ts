import {ZodLoginReq} from '../models/loginReq.model'
import {generateSchema} from '@anatine/zod-openapi';

export const LoginReqSchema = {
    LoginReq: generateSchema(ZodLoginReq)
};