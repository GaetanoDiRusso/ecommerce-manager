import { DataResponse } from "src/utils";
import { POrder } from "../domain/entities/presentation/POrder";
import { IOrderRepository, OrderStatusEnum } from "../domain";

export interface OrderFilter {
    status?: OrderStatusEnum,
    shippingPromiseDateFrom?: Date,
    shippingPromiseDateTo?: Date,
    createDateFrom?: Date,
    createDateTo?: Date,
}

export class GetOrdersUseCase {
    constructor(
        private orderRepository: IOrderRepository
    ){}

    async execute(filter?: OrderFilter): DataResponse<POrder[]> {
        const orders = await this.orderRepository.getPopulatedOrders(filter) as POrder[];
        return orders;
    }
}