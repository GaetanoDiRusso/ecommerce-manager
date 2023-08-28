import {Router} from 'express';
import {orderController} from 'src/di';

export const orderRoutes = Router();

orderRoutes.get('/get', async (req, res) => {
  orderController.getOrders(req, res)

  /*
    #swagger.tags = ['Order']
    #swagger.summary = "Get all orders"

    #swagger.parameters['status'] = {
      type: 'string'
    }

    #swagger.parameters['shippingPromiseDateFrom'] = {
      type: 'number'
    }

    #swagger.parameters['shippingPromiseDateTo'] = {
      type: 'number'
    }

    #swagger.parameters['createDateFrom'] = {
      type: 'number'
    }

    #swagger.parameters['createDateTo'] = {
      type: 'number'
    }
  */

  /*
    #swagger.responses[200] = {
      schema: { $ref: '#/definitions/POrder' }
    }
  */

  /*
    #swagger.responses[401] = {
      description: 'Invalid token | Token expired | Error in token authentication',
      schema: { $ref: '#/definitions/CustomError' }
    }
  */

  /*
    #swagger.responses[500] = {
      description: 'Internal server error',
      schema: { $ref: '#/definitions/CustomError' }
    }
  */
});

orderRoutes.get('/get-pdf', async (req, res) => {
  orderController.getOrdersPdf(req, res)

  /*
    #swagger.tags = ['Order']
    #swagger.summary = "Get orders in a PDF"

    #swagger.parameters['status'] = {
      type: 'string'
    }

    #swagger.parameters['shippingPromiseDateFrom'] = {
      type: 'number'
    }

    #swagger.parameters['shippingPromiseDateTo'] = {
      type: 'number'
    }

    #swagger.parameters['createDateFrom'] = {
      type: 'number'
    }

    #swagger.parameters['createDateTo'] = {
      type: 'number'
    }
  */

  /*
    #swagger.responses[200] = {
      description: 'PDF in base64.'
    }
  */

  /*
    #swagger.responses[401] = {
      description: 'Invalid token | Token expired | Error in token authentication',
      schema: { $ref: '#/definitions/CustomError' }
    }
  */

  /*
    #swagger.responses[500] = {
      description: 'Internal server error',
      schema: { $ref: '#/definitions/CustomError' }
    }
  */
});