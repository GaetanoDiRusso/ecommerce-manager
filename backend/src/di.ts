import {IJsonWebTokenInteractor} from 'src/auth/domain';
import {JwtInteractorImp} from 'src/auth/data/JwtInteractorImp';
import {AuthController} from 'src/auth/infraestructure/auth.controller';
import {IUserRepository} from 'src/user/domain';
import {UserRepositoryMongoDBImp} from 'src/user/data/UserRepositoryMongoDBImp';

import { OrderController } from './order/infraestructure/order.controller';

import { LoginUseCase } from './auth/application/LoginUseCase';
import { GetOrdersUseCase } from './order/application/GetOrdersUseCase';
import { OrderRepositoryMongoDBImp } from './order/data/OrderRepositoryMongoDBImp';
import { GetOrdersPdfUseCase } from './order/application/GetOrdersPdfUseCase';

const userRepository: IUserRepository = new UserRepositoryMongoDBImp();

//Authentication
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  console.error('No JWT_SECRET in enviromental variables');
}
export const jwtInteractor: IJsonWebTokenInteractor = new JwtInteractorImp(jwtSecret || 'vuibrwubweff9384hf93');
const loginUseCase = new LoginUseCase(userRepository, jwtInteractor);
export const authController = new AuthController(loginUseCase);

const orderRepository = new OrderRepositoryMongoDBImp();
const getOrdersUseCase = new GetOrdersUseCase(orderRepository)
const getOrdersPdfUseCase = new GetOrdersPdfUseCase(orderRepository)
export const orderController = new OrderController(getOrdersUseCase, getOrdersPdfUseCase);