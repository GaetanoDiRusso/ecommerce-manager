import { AxiosError, AxiosResponse } from "axios";
import axiosClient from "../axiosClient";
import { API_URL } from "src/config";
import { Item } from "src/domain/entities/Item";
import { Order } from "src/domain/entities/Order";
import { User } from "src/domain/entities/User";
import { OrderStatusEnum } from "src/domain/entities/enum/OrderStatusEnum";
import {
  IOrderRepository,
  OrderFilter,
} from "src/domain/interfaces/IOrderRepository";
import { CustomError } from "src/utils";

export class OrderRepositoryImp implements IOrderRepository {
  async getOrders(filter?: OrderFilter | undefined): Promise<Order[]> {
    try {
      type AxiosRes = {
        id: string;
        createDate: number;
        status: string;
        client: {
          id: string;
          email: string;
          firstName: string;
          lastName: string;
        };
        shippingAddress: string;
        shippingPromise: number;
        items: {
          item: {
            id: string;
            title: string;
            description: string;
            imageUrl: string;
            price: number;
          };
          quantity: number;
        }[];
      }[];

      const { data } = await axiosClient.get<AxiosRes>(API_URL + "/order/get", {
        params: {
          status: filter?.status,
          shippingPromiseDateFrom: filter?.shippingPromiseDateFrom?.getTime(),
          shippingPromiseDateTo: filter?.shippingPromiseDateTo?.getTime(),
          createDateFrom: filter?.createDateFrom?.getTime(),
          createDateTo: filter?.createDateTo?.getTime(),
        },
      });

      const orders = data.map(
        (d) =>
          new Order(
            d.id,
            new Date(d.createDate),
            OrderStatusEnum[d.status.toUpperCase() as keyof typeof OrderStatusEnum],
            new User(
              d.client.id,
              d.client.email,
              d.client.firstName,
              d.client.lastName
            ),
            d.shippingAddress,
            new Date(d.shippingPromise),
            d.items.map((i) => ({
              item: new Item(
                i.item.id,
                i.item.title,
                i.item.description,
                i.item.imageUrl,
                i.item.price
              ),
              quantity: i.quantity,
            }))
          )
      );

      return orders;
    } catch (error) {
      const e = error as AxiosError;
      throw new CustomError(+e.code!, e.message);
    }
  }

  async getOrdersReport(filter?: OrderFilter | undefined): Promise<any> {
    try {

      const { data } = await axiosClient.get(API_URL + "/order/get-pdf", {
        params: {
          status: filter?.status,
          shippingPromiseDateFrom: filter?.shippingPromiseDateFrom?.getTime(),
          shippingPromiseDateTo: filter?.shippingPromiseDateTo?.getTime(),
          createDateFrom: filter?.createDateFrom?.getTime(),
          createDateTo: filter?.createDateTo?.getTime(),
        },
      });

      return data;
    } catch (error) {
      const e = error as AxiosError;
      throw new CustomError(+e.code!, e.message);
    }
  }
}
