import { AuthRepositoryImp } from "./data/auth/AuthRepositoryImp";
import { OrderRepositoryImp } from "./data/auth/OrderRepositoryImp";

export const authRepository = new AuthRepositoryImp();
export const orderRepository = new OrderRepositoryImp();