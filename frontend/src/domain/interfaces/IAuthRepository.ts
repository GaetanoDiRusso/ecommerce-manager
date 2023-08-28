import { DataResponse } from "src/utils";
import { AuthResponse } from "../entities/AuthResponse";

export interface IAuthRepository {
    login(email: string, password: string): DataResponse<AuthResponse>
}