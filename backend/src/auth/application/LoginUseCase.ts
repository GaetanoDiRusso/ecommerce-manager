import {User, IUserRepository, UserWithPassword} from 'src/user/domain';
import {IJsonWebTokenInteractor, AuthResponse, AuthData} from 'src/auth/domain';
import {CustomError, DataResponse, errorCodeEnum, errorMessageEnum, IDGenerator, StringHasher} from 'src/utils';

export class LoginUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtInteractor: IJsonWebTokenInteractor
  ) {}

  async execute(email: string, password: string): DataResponse<AuthResponse> {
    try {
      const searchedUser = (await this.userRepository.findByEmail(email)) as UserWithPassword | null;
      if (!searchedUser) {
        throw new CustomError(errorCodeEnum.NOT_FOUND, errorMessageEnum.USER_NOT_FOUND);
      }

      const passwordMatch = StringHasher.compareWithHashedString(password, searchedUser.password);

      if (!passwordMatch) {
        throw new CustomError(errorCodeEnum.NOT_FOUND, errorMessageEnum.USER_NOT_FOUND);
      }

      const searchedUserWithoutPassword = User.fromUserWithPassword(searchedUser);
      
      const authData = (await this.jwtInteractor.generateToken(searchedUserWithoutPassword)) as AuthData;

      return new AuthResponse(authData, searchedUserWithoutPassword);
    } catch (error) {
      throw error;
    }
  }
}
