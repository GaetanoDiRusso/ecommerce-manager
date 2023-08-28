import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import {authMiddleware} from 'src/middlewares/auth.middleware'

import { connectDB } from 'src/db/mongoDB';

//Auth Routes
import { authRoutes } from 'src/auth/infraestructure/auth.route';

//Order Routes
import { orderRoutes } from 'src/order/infraestructure/order.route';

// Documentation
import swaggerUI from 'swagger-ui-express';
import swaggerDocs from 'swagger-doc.json';
import { develop, staging } from 'src/config';

export const app = express();
app.use(express.json({limit: '50mb'}));

const port = process.env.PORT || 3000;
const serverURL = process.env.SERVER_BASE_URL ? 'https://' + process.env.SERVER_BASE_URL : `http://localhost:${port}`

// CORS
app.use(cors());
// ACCEPT JSON Content-Type
app.use(express.json());

//Add Docs middleware
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//Auth endpoints
app.use('/auth', authRoutes);

//User endpoints
app.use('/order', authMiddleware, orderRoutes);

//Server entry point
app.get('/', (req, res) => {
  /*
    #swagger.tags = ['Server']
    #swagger.summary = "Server entry point"
  */
  res.status(200).send(`Server online. Visit ${serverURL}/api-docs to read the documentation.`);
});

export const server = app.listen(port, async () => {
  try {
    console.log('Server listening on port ' + port);
    console.log('Connecting DB...');
    await connectDB()
    console.log('DB connected')
  } catch (error) {
    console.log(error)
  }
});
