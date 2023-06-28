import { Router } from 'express';
import productController from '../controllers/product.controller';
import validateProduct from '../middlewares/product.middleware';

const productRouter = Router();

productRouter.post('/', validateProduct, productController.create);
productRouter.get('/', productController.findAll);

export default productRouter;