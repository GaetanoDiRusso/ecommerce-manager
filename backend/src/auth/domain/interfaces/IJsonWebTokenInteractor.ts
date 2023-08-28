import {AuthData} from 'src/auth/domain'
import { User } from 'src/user/domain';
import { DataResponse } from "src/utils";

export interface IJsonWebTokenInteractor {
    generateToken(user: User): DataResponse<AuthData>;
    decodeToken(authData: AuthData): DataResponse<TokenDecodedData>;
}

export type TokenDecodedData = {
    id: string;
}