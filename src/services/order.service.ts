import { Sequelize } from 'sequelize';
import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';

async function findAll(): Promise<ServiceResponse<OrderSequelizeModel[]>> {
  const orders = await OrderModel.findAll({
    attributes: [
      'id',
      'userId',
      [Sequelize.literal('JSON_ARRAYAGG(productIds.id)'), 'productIds'],
    ],
    include: [{
      model: ProductModel,
      as: 'productIds',
      attributes: [],
    }],
    group: ['Order.id'],
    raw: true,
  });
  
  const serviceResponse: ServiceResponse<OrderSequelizeModel[]> = {
    status: 'SUCCESSFUL', data: orders };
  return serviceResponse;
}

export default {
  findAll,
};