import {AuthData} from './AuthData';
import {User} from 'src/user/domain/entities';

export class AuthResponse {
  constructor(readonly credentials: AuthData, readonly user: User) {}
}
