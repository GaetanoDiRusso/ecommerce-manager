import { DataResponse } from "src/utils";
import { Order } from "../entities/Order";
import { OrderStatusEnum } from "../entities/enum/OrderStatusEnum";

export interface OrderFilter {
    status?: OrderStatusEnum,
    shippingPromiseDateFrom?: Date,
    shippingPromiseDateTo?: Date,
    createDateFrom?: Date,
    createDateTo?: Date,
}

export interface IOrderRepository {
    getOrders(filter?: OrderFilter): DataResponse<Order[]>
    getOrdersReport(filter?: OrderFilter): DataResponse<any>
}