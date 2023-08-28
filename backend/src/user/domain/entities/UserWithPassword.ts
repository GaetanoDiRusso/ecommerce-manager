import {User} from './User';

export class UserWithPassword extends User {
  constructor(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    readonly password: string,
  ) {
    super(id, email, firstName, lastName);
  }
}
