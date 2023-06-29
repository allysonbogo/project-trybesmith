import { Router } from 'express';
import orderController from '../controllers/order.controller';
import validateJWT from '../middlewares/auth.middleware';
import validateOrder from '../middlewares/order.middleware';

const orderRouter = Router();

orderRouter.get('/', orderController.findAll);
orderRouter.post('/', validateJWT, validateOrder, orderController.create);

export default orderRouter;