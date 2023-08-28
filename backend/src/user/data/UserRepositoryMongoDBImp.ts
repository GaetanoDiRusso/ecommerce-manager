import {IUserRepository} from 'src/user/domain/interfaces';
import {CustomError, DataResponse, errorCodeEnum, errorMessageEnum} from 'src/utils';
import {User, UserWithPassword} from 'src/user/domain';
import {IDGenerator} from 'src/utils';
import UserMongoose, {mongooseUserToDomain} from './models/UserMongoose.model';

export class UserRepositoryMongoDBImp implements IUserRepository {
  constructor() {}

  async findByEmail(email: string): DataResponse<UserWithPassword | null> {
    try {
      const searchedUser = await UserMongoose.findOne({email});

      if (searchedUser) {
        return mongooseUserToDomain(searchedUser);
      } else {
        return null;
      }
    } catch (error) {
      throw new CustomError(errorCodeEnum.SERVER_ERROR, errorMessageEnum.DATABASE_ERROR);
    }
  }

  async createUser(newUser: UserWithPassword): DataResponse<UserWithPassword> {
    const existingUser = await this.findByEmail(newUser.email);

    if (existingUser) {
      throw new CustomError(errorCodeEnum.CONFLICT, errorMessageEnum.EMAIL_ALREADY_EXISTS);
    } else {
      try {
        const createdUser = await UserMongoose.create({
          _id: IDGenerator.getNewId(),
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          password: newUser.password,
        });

        return mongooseUserToDomain(createdUser);
      } catch (error: any) {
        throw new CustomError(errorCodeEnum.SERVER_ERROR, error.message);
      }
    }
  }

  async findById(id: string): DataResponse<UserWithPassword | null> {
    try {
      const searchedUser = await UserMongoose.findById(id);

      if (searchedUser) {
        return mongooseUserToDomain(searchedUser);
      } else {
        return null;
      }
    } catch (error) {
      throw new CustomError(errorCodeEnum.SERVER_ERROR, errorMessageEnum.DATABASE_ERROR);
    }
  }
}
