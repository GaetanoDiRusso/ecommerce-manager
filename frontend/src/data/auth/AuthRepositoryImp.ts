import axios, { Axios, AxiosError } from "axios";
import { API_URL } from "src/config";
import { AuthData } from "src/domain/entities/AuthData";
import { AuthResponse } from "src/domain/entities/AuthResponse";
import { User } from "src/domain/entities/User";
import { IAuthRepository } from "src/domain/interfaces/IAuthRepository";
import { CustomError } from "src/utils";

export class AuthRepositoryImp implements IAuthRepository {
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
        interface AxiosRes {
          credentials: {
            token: string;
          };
          user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
          };
        }
    
        const {
          data: { user, credentials },
        } = await axios.post<AxiosRes>(API_URL + "/auth/login", {
          email,
          password,
        });
    
        return new AuthResponse(
          new AuthData(credentials.token),
          new User(user.id, user.email, user.firstName, user.lastName)
        );
    } catch (error) {
        const e = error as AxiosError;
        throw new CustomError(+e.code!, e.message);
    }
  }
}
