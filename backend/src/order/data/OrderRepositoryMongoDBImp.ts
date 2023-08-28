import {DataResponse} from 'src/utils';
import {IOrderRepository, OrderStatusEnum} from '../domain';
import {POrder} from '../domain/entities/presentation/POrder';
import OrderMongoose from './models/OrderMongoose.model';
import {PUser} from 'src/user/domain';
import {PItem} from 'src/item/domain/entities/presentation/PItem';
import {OrderFilter} from 'src/order/application/GetOrdersUseCase';

export class OrderRepositoryMongoDBImp implements IOrderRepository {
  constructor() {}

  async getPopulatedOrders(filter: OrderFilter): DataResponse<POrder[]> {
    const queryObject: {[key: string]: any} = {};

    if (filter.status) {
      queryObject.status = filter.status
    }

    if (filter.shippingPromiseDateFrom) {
      queryObject.shippingPromise = { $gte: filter.shippingPromiseDateFrom.getTime() }
    }

    if (filter.shippingPromiseDateTo) {
      queryObject.shippingPromise = { $lte: filter.shippingPromiseDateTo.getTime() }
    }

    if (filter.createDateFrom) {
      queryObject.createDate = { $gte: filter.createDateFrom.getTime() }
    }

    if (filter.createDateTo) {
      queryObject.createDate = { $lte: filter.createDateTo.getTime() }
    }

    try {
      const mongooseOrders = await OrderMongoose.find(queryObject)
        .populate({path: 'client'})
        .populate({
          path: 'orderedItems',
          populate: {path: 'item'},
        });

      const orders = mongooseOrders.map(e => e.toObject({ virtuals: true })).map(
        (o) => {
          return new POrder(
            o.id,
            new Date(o.createDate),
            OrderStatusEnum[o.status.toUpperCase() as keyof typeof OrderStatusEnum],
            new PUser(o.client.id, o.client.email, o.client.firstName, o.client.lastName),
            o.shippingAddress,
            new Date(o.shippingPromise),
            o.orderedItems.map((i: any) => {
              return {
                item: new PItem(i.item.id, i.item.title, i.item.description, i.item.imageUrl, i.item.price),
                quantity: i.quantity,
              }
            })
          )
        }
      );

      return orders;
    } catch (error) {
      console.log({error});
      throw error;
    }
  }
}

const items = [
  new PItem('i1', 'item 1 title', 'item 1 desc', 'www.item1.com', 1111),
  new PItem('i2', 'item 2 title', 'item 2 desc', 'www.item2.com', 2222),
  new PItem('i3', 'item 3 title', 'item 3 desc', 'www.item3.com', 3333),
  new PItem('i4', 'item 4 title', 'item 4 desc', 'www.item4.com', 4444),
];

const orderedItems1 = [
  {item: items[0], quantity: 5},
  {item: items[1], quantity: 3},
  {item: items[2], quantity: 1},
  {item: items[3], quantity: 2},
];

const orderedItems2 = [
  {item: items[1], quantity: 1},
  {item: items[0], quantity: 2},
];

const orderedItems3 = [{item: items[1], quantity: 10}];

const orderedItems4 = [
  {item: items[0], quantity: 8},
  {item: items[1], quantity: 1},
  {item: items[3], quantity: 2},
];

const orderedItems5 = [
  {item: items[1], quantity: 6},
  {item: items[3], quantity: 2},
];

const fakeOrders = [
  new POrder(
    'o1',
    new Date('07-26-2023'),
    OrderStatusEnum.APPROVE,
    new PUser('c1', 'c1@email.com', 'c1Name', 'c1LName'),
    'c1 address 1111',
    new Date(new Date().setMonth(new Date().getMonth() + 1)),
    orderedItems1
  ),
  new POrder(
    'o2',
    new Date('07-26-2023'),
    OrderStatusEnum.CANCEL,
    new PUser('c2', 'c2@email.com', 'c2Name', 'c2LName'),
    'c2 address 2222',
    new Date(new Date().setMonth(new Date().getMonth() + 2)),
    orderedItems2
  ),
  new POrder(
    'o3',
    new Date('07-26-2023'),
    OrderStatusEnum.TRAVELING,
    new PUser('c3', 'c3@email.com', 'c3Name', 'c3LName'),
    'c3 address 3333',
    new Date(new Date().setMonth(new Date().getMonth() + 3)),
    orderedItems3
  ),
  new POrder(
    'o4',
    new Date('07-26-2023'),
    OrderStatusEnum.APPROVE,
    new PUser('c4', 'c4@email.com', 'c4Name', 'c4LName'),
    'c4 address 4444',
    new Date(new Date().setMonth(new Date().getMonth() + 4)),
    orderedItems4
  ),
  new POrder(
    'o5',
    new Date('07-26-2023'),
    OrderStatusEnum.DELIVERY,
    new PUser('c5', 'c5@email.com', 'c5Name', 'c5LName'),
    'c5 address 5555',
    new Date(new Date().setMonth(new Date().getMonth() + 5)),
    orderedItems5
  ),
];
