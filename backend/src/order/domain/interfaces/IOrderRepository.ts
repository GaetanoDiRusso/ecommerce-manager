import {DataResponse} from 'src/utils';
import { POrder } from '../entities/presentation/POrder';
import { OrderFilter } from 'src/order/application/GetOrdersUseCase';

export interface IOrderRepository {
  getPopulatedOrders(filter?: OrderFilter): DataResponse<POrder[]>;
}
