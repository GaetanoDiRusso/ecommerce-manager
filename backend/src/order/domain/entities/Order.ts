import {OrderStatusEnum} from './enum/OrderStatusEnum';

export class Order {
  constructor(
    readonly id: string,
    readonly createDate: Date,
    readonly status: OrderStatusEnum,
    readonly client: string,  //We have a reference to the client (the id of the user in this case)
    readonly shippingAddress: string,
    readonly shippingPromise: Date,
    readonly orderedItems: {item: string; quantity: number}[] //We have a reference to the item (the id of it in this case)
  ) {}
}
