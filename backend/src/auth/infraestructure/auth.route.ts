import {Router} from 'express';
import {authController} from 'src/di';

export const authRoutes = Router();

authRoutes.post('/login', async (req, res) => {
  authController.login(req, res);

  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = "Login with existing user"
    #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#definitions/LoginReq' }
    }
  */

  /*
    #swagger.responses[200] = {
      schema: { $ref: '#/definitions/AuthResponse' }
    }
  */

  /*
    #swagger.responses[404] = {
      description: "Invalid credentials",
      schema: { $ref: '#/definitions/CustomError' }
    }
  */

  /*
  #swagger.responses[400] = {
      description: "Invalid input parameters",
      schema: { $ref: '#/definitions/InputError' }
    }
  */

  /*
    #swagger.responses[500] = {
      schema: { $ref: '#/definitions/CustomError' }
    }
  */
});