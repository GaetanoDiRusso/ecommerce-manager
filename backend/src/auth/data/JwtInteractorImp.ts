import {AuthData, IJsonWebTokenInteractor, TokenDecodedData} from '../domain';
import {CustomError, DataResponse, errorCodeEnum, errorMessageEnum} from 'src/utils';
import {User} from 'src/user/domain';

import 'dotenv/config';
import jwt from 'jsonwebtoken';

export class JwtInteractorImp implements IJsonWebTokenInteractor {
  constructor(private jwtSecret: string){}

  async generateToken(user: User): DataResponse<AuthData> {
    const token = jwt.sign(
      {
        id: user.id,
      },
      this.jwtSecret
    );

    return new AuthData(token);
  }

  async decodeToken(authData: AuthData): DataResponse<TokenDecodedData> {
    try {
      const userId = jwt.verify(authData.token, this.jwtSecret) as jwt.JwtPayload;

      return {
        id: userId.id as string,
      };
    } catch (error) {
      throw new CustomError(errorCodeEnum.UNAUTHORIZED, errorMessageEnum.INVALID_TOKEN);
    }
  }
}
