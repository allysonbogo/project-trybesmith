import ProductModel from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

async function create(product: Product): Promise<ServiceResponse<Product>> {
  const newProduct = await ProductModel.create(product);
  const serviceResponse: ServiceResponse<Product> = {
    status: 'SUCCESSFUL', data: newProduct.dataValues };
  return serviceResponse;
}

async function findAll(): Promise<ServiceResponse<Product[]>> {
  const products = await ProductModel.findAll();
  const serviceResponse: ServiceResponse<Product[]> = {
    status: 'SUCCESSFUL', data: products.map((p) => p.dataValues) };
  return serviceResponse;
}

export default {
  create,
  findAll,
};