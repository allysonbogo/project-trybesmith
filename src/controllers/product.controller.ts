import { Request, Response } from 'express';
import productService from '../services/product.service';

async function create(req: Request, res: Response): Promise<Response> {
  const { name, price, orderId } = req.body;
  const serviceResponse = await productService.create({
    name, price, orderId,
  });

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