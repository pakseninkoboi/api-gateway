import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      accesstoken?: string;
      refreshtoken?: string;
      user?: any;
    }
  }
}
