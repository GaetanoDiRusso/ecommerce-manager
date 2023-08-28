import {DataResponse} from 'src/utils';
import {User, UserWithPassword} from 'src/user/domain/entities';

export interface IUserRepository {
  findByEmail(email: string): DataResponse<User | null>;
  findById(id: string): DataResponse<User | null>;
  createUser(newUser: UserWithPassword): DataResponse<User>;
}
