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

async function create(userId: number, productIds: number[])
  : Promise<ServiceResponse<OrderSequelizeModel | unknown>> {
  const newOrder = await OrderModel.create({ userId });
  const orderId = newOrder.dataValues.id;
  await Promise.all(productIds.map((id) =>
    ProductModel.update({ orderId }, { where: { id } })));

  const serviceResponse: ServiceResponse<OrderSequelizeModel | unknown> = {
    status: 'SUCCESSFUL', data: { userId, productIds } };
  
  return serviceResponse;
}

export default {
  findAll,
  create,
};