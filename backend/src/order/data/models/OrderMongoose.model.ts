import mongoose, { Schema } from 'mongoose';
import ItemMongooseModel from 'src/item/data/models/ItemMongoose.model';
import { Order } from 'src/order/domain/entities/Order';
import UserMongooseModel from 'src/user/data/models/UserMongoose.model';

export type OrderMongooseModel = Omit<Order, 'id'> & mongoose.Document;

const orderSchema = new mongoose.Schema<OrderMongooseModel>({
  createDate: {type: Number, required: true} as any,  //store the date as timestamp
  status: {type: String, enum: ["approve", "cancel", "delivery", "traveling"], required: true},
  client: {type: Schema.Types.ObjectId, ref: UserMongooseModel, required: true} as any,  //client is a reference to Model
  shippingAddress: {type: String, required: true},
  shippingPromise: {type: Number, required: true}  as any,  //store the date as timestamp
  orderedItems: {item: {type: Schema.Types.ObjectId, ref: ItemMongooseModel}, quantity: Number}  //itemId is a reference to Item Model
});

export default mongoose.model<OrderMongooseModel>('Order', orderSchema, 'orders');