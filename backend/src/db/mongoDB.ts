import mongoose from "mongoose";
import 'dotenv/config';
import { CustomError, errorCodeEnum } from "src/utils";

const mongooseUrl = process.env.MONGOOSE_URL;

export const connectDB = async () => {
    if(mongooseUrl) {
        try {
            await mongoose.connect(mongooseUrl);
            return;
        } catch(error: any) {
            throw new CustomError(errorCodeEnum.SERVER_ERROR, error.message)
        }
    } else {
        throw new CustomError(errorCodeEnum.SERVER_ERROR, 'No mongoose URL setted in enviromental variables')
    }
}