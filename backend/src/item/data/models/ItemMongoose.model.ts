import mongoose from 'mongoose';
import { Item } from 'src/item/domain/entities/Item';

export type ItemMongooseModel = Omit<Item, 'id'> & mongoose.Document;

const ItemSchema = new mongoose.Schema<ItemMongooseModel>({
  title: {type: String, required: true},
  description: {type: String, required: true},
  imageUrl: {type: String, required: true},
  price: {type: Number, required: true},
});

export default mongoose.model<ItemMongooseModel>('Item', ItemSchema, 'items');