import mongoose from 'mongoose';
import {UserWithPassword} from 'src/user/domain';

export type UserMongooseModel = Omit<UserWithPassword, 'id'> & mongoose.Document;

const userSchema = new mongoose.Schema<UserMongooseModel>({
  email: {type: String, required: true, unique: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, required: true},
});

export const mongooseUserToDomain = (mongooseUser: UserMongooseModel): UserWithPassword  => {
  return new UserWithPassword(
    mongooseUser._id,
    mongooseUser.email,
    mongooseUser.firstName,
    mongooseUser.lastName,
    mongooseUser.password
  );
}

export default mongoose.model<UserMongooseModel>('User', userSchema, 'users');