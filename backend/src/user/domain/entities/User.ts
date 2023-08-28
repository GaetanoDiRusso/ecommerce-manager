import { PUser } from "./presentation/PUser";
import { UserWithPassword } from './UserWithPassword';

export class User {
  constructor(
    readonly id: string,
    readonly email: string,
    readonly firstName: string,
    readonly lastName: string,
  ) {}

  static fromUserWithPassword(user: UserWithPassword) {
    return new User(user.id, user.email, user.firstName, user.lastName);
  }

  toPUser(): PUser {
    // In this case the User and PUser (Presentation User) are the same
    // but they could be different depending on which data is needed to be sent
    return new PUser(this.id, this.email, this.firstName, this.lastName)
  }
}
