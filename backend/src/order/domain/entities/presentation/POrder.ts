import { PUser } from "src/user/domain";
import { OrderStatusEnum } from "../enum/OrderStatusEnum";
import { PItem } from "src/item/domain/entities/presentation/PItem";

interface OrderedItem {
    item: PItem,
    quantity: number,
}

export class POrder {
    constructor(
        readonly id: string,
        readonly createDate: Date,
        readonly status: OrderStatusEnum,
        readonly client: PUser,
        readonly shippingAddress: string,
        readonly shippingPromise: Date,
        readonly items: OrderedItem[],
    ){}
}