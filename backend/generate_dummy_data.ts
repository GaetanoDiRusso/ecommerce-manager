import ItemMongooseModel from 'src/item/data/models/ItemMongoose.model';
import OrderMongooseModel from 'src/order/data/models/OrderMongoose.model';
import {OrderStatusEnum} from 'src/order/domain';
import UserMongooseModel from 'src/user/data/models/UserMongoose.model';
import {Request, Response} from 'src/utils/ExpressTypes';

export default async function (req: Request, res: Response) {
  try {
    const userQty = await UserMongooseModel.count();

    if (userQty > 0) {
      return res.status(200).send('Dummy data already generated.');
    }

    const [adminUser, pabloUser, juanUser, pedroUser] = await Promise.all([
      UserMongooseModel.create({
        email: 'admin@email.com',
        password: 'admin1234',
        firstName: 'AdminFN',
        lastName: 'AdminLN',
      }),
      UserMongooseModel.create({
        email: 'pablo@email.com',
        password: 'pablo1234',
        firstName: 'Pablo',
        lastName: 'Gonzalez',
      }),
      UserMongooseModel.create({
        email: 'Juan@email.com',
        password: 'juan1234',
        firstName: 'Juan',
        lastName: 'Gomez',
      }),
      UserMongooseModel.create({
        email: 'Pedro@email.com',
        password: 'pedro1234',
        firstName: 'Pedro',
        lastName: 'Alvarez',
      }),
    ]);

    const [redCarItem, blueCarItem, headphonesItem, watchItem] = await Promise.all([
      ItemMongooseModel.create({
        title: 'Auto Rojo',
        description: 'Auto Rojo a control remoto con baterias',
        imageUrl: 'https://http2.mlstatic.com/D_Q_NP_885275-MLU71074270687_082023-O.webp',
        price: 5500,
      }),
      ItemMongooseModel.create({
        title: 'Auto Azul',
        description: 'Auto Azul a control remoto con baterias',
        imageUrl:
          'https://d391ci4kxgasl8.cloudfront.net/fit-in/524x480/filters:fill(FFFFFF):quality(90):format(webp)/_img_productos/auto-control-remoto-motion-climb-foto-azul2.jpg',
        price: 5900,
      }),
      ItemMongooseModel.create({
        title: 'Auriculares inalambricos',
        description: 'Auriculares inalambricos blancos bluetooth',
        imageUrl:
          'https://f.fcdn.app/imgs/2420da/amvstore.com.uy/amvsuy/e4dd/original/catalogo/1057_1057_1/2000-2000/auriculares-inalambricos-tecno-buds-bd01-bluetooth-auriculares-inalambricos-tecno-buds-bd01-bluetooth.jpg',
        price: 3200,
      }),
      ItemMongooseModel.create({
        title: 'Reloj',
        description: 'Reloj de mano plateado',
        imageUrl: 'https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2023/01/18/16740587264944.jpg',
        price: 3900,
      }),
    ]);

    const orders = await Promise.all([
      OrderMongooseModel.create({
        createDate: new Date('08-20-2023'),
        status: OrderStatusEnum.DELIVERY,
        client: pabloUser,
        shippingAddress: 'Av Italia 4321',
        shippingPromise: new Date('08-31-2023'),
        orderedItems: [
          {item: redCarItem, quantity: 3},
          {item: blueCarItem, quantity: 2},
        ],
      }),
      OrderMongooseModel.create({
        createDate: new Date('08-22-2023'),
        status: OrderStatusEnum.TRAVELING,
        client: juanUser,
        shippingAddress: 'Av de las Americas 1111',
        shippingPromise: new Date('09-02-2023'),
        orderedItems: [{item: headphonesItem, quantity: 1}],
      }),
      OrderMongooseModel.create({
        createDate: new Date('08-26-2023'),
        status: OrderStatusEnum.TRAVELING,
        client: pedroUser,
        shippingAddress: 'Av Rivera 3344',
        shippingPromise: new Date('09-07-2023'),
        orderedItems: [
          {item: watchItem, quantity: 2},
          {item: headphonesItem, quantity: 1},
        ],
      }),
      OrderMongooseModel.create({
        createDate: new Date('08-28-2023'),
        status: OrderStatusEnum.APPROVE,
        client: juanUser,
        shippingAddress: 'Av a la Playa 1111',
        shippingPromise: new Date('09-02-2023'),
        orderedItems: [{item: redCarItem, quantity: 7}],
      }),
    ]);

    res.status(200).send('Dummy data generated.');
  } catch (error) {
    console.log({ error });
  }
}
