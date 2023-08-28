import {AuthData} from './AuthData';
import { User } from './User';

export class AuthResponse {
  constructor(readonly credentials: AuthData, readonly user: User) {}
}
