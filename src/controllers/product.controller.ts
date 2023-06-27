import { Request, Response } from 'express';
import productService from '../services/product.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function create(req: Request, res: Response): Promise<Response> {
  const { name, price, orderId } = req.body;
  const serviceResponse = await productService.create({
    name, price, orderId,
  });
  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
  return res.status(201).json(serviceResponse.data);
}

async function findAll(req: Request, res: Response): Promise<Response> {
  const serviceResponse = await productService.findAll();
  return res.status(200).json(serviceResponse.data);
}

export default {
  create,
  findAll,
};