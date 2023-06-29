import { NextFunction, Request, Response } from 'express';

type ValidationResponse = {
  statusCode: number;
  message: string;
};

function validateParams(param: object): ValidationResponse | void {
  if (!Object.values(param)[0]) {
    return {
      statusCode: 400,
      message: `"${Object.keys(param)[0]}" is required`,
    };
  }
  if (Object.values(param)[0].length < 3) {
    return {
      statusCode: 422,
      message: `"${Object.keys(param)[0]}" length must be at least 3 characters long`,
    };
  }
  if (typeof Object.values(param)[0] !== 'string') {
    return {
      statusCode: 422,
      message: `"${Object.keys(param)[0]}" must be a string`,
    };
  }
}

function validateProduct(req: Request, res: Response, next: NextFunction): Response | void {
  const { name, price } = req.body;
  const nameValidation = validateParams({ name });
  const priceValidation = validateParams({ price });
  
  if (nameValidation) {
    return res.status(nameValidation.statusCode).json({ message: nameValidation.message });
  }

  if (priceValidation) {
    return res.status(priceValidation.statusCode).json({ message: priceValidation.message });
  }

  next();
}

export default validateProduct;