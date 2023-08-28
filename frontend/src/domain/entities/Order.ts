import { OrderStatusEnum } from "./enum/OrderStatusEnum";
import { Item } from "./Item";
import { User } from "./User";

interface OrderedItem {
  item: Item;
  quantity: number;
}

export class Order {
  constructor(
    readonly id: string,
    readonly createDate: Date,
    readonly status: OrderStatusEnum,
    readonly client: User,
    readonly shippingAddress: string,
    readonly shippingPromise: Date,
    readonly items: OrderedItem[]
  ) {}
}
