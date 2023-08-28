import {CustomError, DataResponse, InputError} from 'src/utils';

import {Request, Response} from 'src/utils/ExpressTypes';
import { parseLoginReq } from './models';
import { LoginUseCase } from '../application/LoginUseCase';

export class AuthController {
  constructor(private loginUseCase: LoginUseCase) {}

  async login(req: Request, res: Response): DataResponse<void> {
    try {
      const loginDataReq = parseLoginReq(req.body);

      const authRes = await this.loginUseCase.execute(loginDataReq.email, loginDataReq.password);

      res.status(200).send(authRes);
    } catch (error: any) {
      const customError = error as CustomError | InputError;
      res.status(customError.code).send(customError);
    }
  }
}
