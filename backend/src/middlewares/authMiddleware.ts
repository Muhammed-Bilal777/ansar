import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../logger/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secure_jwt_secret';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined.');
}

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Get token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Please Login to access this resource' });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === 'string') {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    // 3. Attach user info to request
    (req as any).user = decoded; // or extend Request type (see below)
    logger.info(decoded);
    next();
  } catch (err) {
    console.error('Auth error:', err);
    return res
      .status(401)
      .json({ message: 'Something went wrong please login again', error: err });
  }
};
