import { NextFunction, Request, Response } from 'express';
import UserModel from '../database/models/user.model';

type ValidationResponse = {
  statusCode: number;
  message: string;
};

async function validateUserId(userId: number): Promise<ValidationResponse | void> {
  if (!userId) {
    return { statusCode: 400, message: '"userId" is required' };
  }
  if (typeof userId !== 'number') {
    return { statusCode: 422, message: '"userId" must be a number' };
  }
  const foundUser = await UserModel.findByPk(userId);
  if (!foundUser) {
    return { statusCode: 404, message: '"userId" not found' };
  }
}

function validateProductIds(productIds: number[]): ValidationResponse | void {
  if (!productIds) {
    return { statusCode: 400, message: '"productIds" is required' };
  }
  if (!Array.isArray(productIds)) {
    return { statusCode: 422, message: '"productIds" must be an array' };
  }
  if (productIds.length === 0 || productIds.some((product) => typeof product !== 'number')) {
    return { statusCode: 422, message: '"productIds" must include only numbers' };
  }
}

async function validateOrder(req: Request, res: Response, next: NextFunction)
  : Promise<Response | void> {
  const { userId, productIds } = req.body;
  const userIdValidation = await validateUserId(userId);
  const productsValidation = validateProductIds(productIds);
  
  if (userIdValidation) {
    return res.status(userIdValidation.statusCode).json({ message: userIdValidation.message });
  }

  if (productsValidation) {
    return res.status(productsValidation.statusCode).json({ message: productsValidation.message });
  }

  next();
}

export default validateOrder;