import { NextFunction, Request, Response } from 'express';
import jwtUtil from '../utils/JWT';

const validateJWT = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { authorization } = req.headers;
  
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  
  const token = authorization.split(' ')[1];

  try {
    const decoded = jwtUtil.verify(token);
    if (!decoded) throw new Error('Invalid token');

    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default validateJWT;