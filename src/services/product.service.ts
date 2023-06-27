import ProductModel from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

async function create(product: Product): Promise<ServiceResponse<Product>> {
  const newProduct = await ProductModel.create(product);
  const serviceResponse: ServiceResponse<Product> = {
    status: 'SUCCESSFUL', data: newProduct.dataValues };
  return serviceResponse;
}

export default {
  create,
};