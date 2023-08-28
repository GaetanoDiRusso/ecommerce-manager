import {Request, Response, NextFunction} from 'src/utils/ExpressTypes';
import { CustomError, errorCodeEnum } from "src/utils";
import {jwtInteractor} from 'src/di'  
import { AuthData, TokenDecodedData } from "src/auth/domain";

export const verifyToken = async (token?: string) => {
  if (!token) throw new CustomError(errorCodeEnum.UNAUTHORIZED, "You must be logged in");

  try {
    const res = await jwtInteractor.decodeToken(new AuthData(token)) as TokenDecodedData;
    
    return res.id
  } catch (error) {
    throw new CustomError(errorCodeEnum.UNAUTHORIZED, "Error in token authentication")
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.parameters['authorization'] = {
      in: 'header',
      type: 'string',
      required: true,
      description: 'JWT token, must be sent in headers.authorization',
      example: 'Bearer sdnfsoidnf239j3904fj9034f-924n-24nf.vn4039f902f903n90n392f...',
    }
  */
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const userId = await verifyToken(token)

    req.userId = userId;

    next();
  } catch (error) {
    const customError = error as CustomError;
    res.status(customError.code).send(customError);
  }

  /*
    #swagger.responses[401] = {
      schema: { $ref: '#/definitions/CustomError' }
    }
  */
};
