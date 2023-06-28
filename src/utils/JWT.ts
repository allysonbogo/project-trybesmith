import jwt from 'jsonwebtoken';
import TokenPayload from '../types/TokenPayload';

const secret = process.env.JWT_SECRET || 'charmander-char';

function sign(payload: TokenPayload): string {
  const token = jwt.sign(payload, secret);
  return token;
}

function verify(token: string): TokenPayload {
  const decoded = jwt.verify(token, secret) as TokenPayload;
  return decoded;
}

export default {
  sign,
  verify,
};