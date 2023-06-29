import { Request, Response } from 'express';
import orderService from '../services/order.service';

async function findAll(req: Request, res: Response): Promise<Response> {
  const serviceResponse = await orderService.findAll();
  return res.status(200).json(serviceResponse.data);
}

async function create(req: Request, res: Response): Promise<Response> {
  const { userId, productIds } = req.body;
  const serviceResponse = await orderService.create(userId, productIds);

  return res.status(201).json(serviceResponse.data);
}

export default {
  findAll,
  create,
};