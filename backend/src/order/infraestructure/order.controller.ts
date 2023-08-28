import {CustomError, DataResponse, InputError} from 'src/utils';

import {Request, Response} from 'src/utils/ExpressTypes';
import {GetOrdersUseCase, OrderFilter} from '../application/GetOrdersUseCase';
import { POrder } from '../domain/entities/presentation/POrder';
import { parseGetOrdersReq } from './models/GetOrdersReq.model';
import { OrderStatusEnum } from '../domain';
import { GetOrdersPdfUseCase } from '../application/GetOrdersPdfUseCase';

export class OrderController {
  constructor(private getOrdersUseCase: GetOrdersUseCase, private getOrdersPdfUseCase: GetOrdersPdfUseCase) {}

  async getOrders(req: Request, res: Response): DataResponse<void> {
    try {
      const filter = parseOrderFilter(req.query);

      const orders = (await this.getOrdersUseCase.execute(filter)) as POrder[];

      res.status(200).send(orders);
    } catch (error: any) {
      const customError = error as CustomError | InputError;
      res.status(customError.code).send(customError);
    }
  }

  async getOrdersPdf(req: Request, res: Response): DataResponse<void> {
    try {
      const filter = parseOrderFilter(req.query);

      const ordersPdf = await this.getOrdersPdfUseCase.execute(filter)

      res.status(200).send(ordersPdf);
    } catch (error: any) {
      const customError = error as CustomError | InputError;
      res.status(customError.code).send(customError);
    }
  }
}

const parseOrderFilter = (data: any): OrderFilter => {
  return {
    status: OrderStatusEnum[data?.status?.toUpperCase() as keyof typeof OrderStatusEnum] ?? undefined,
    shippingPromiseDateFrom: data?.shippingPromiseDateFrom ? new Date(+data.shippingPromiseDateFrom) : undefined,
    shippingPromiseDateTo: data?.shippingPromiseDateTo ? new Date(+data.shippingPromiseDateTo) : undefined,
    createDateFrom: data?.createDateFrom ? new Date(+data.createDateFrom) : undefined,
    createDateTo: data?.createDateTo ? new Date(+data.createDateTo) : undefined,
  }
}
