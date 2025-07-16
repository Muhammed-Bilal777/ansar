import { Request, Response, NextFunction } from 'express';

export const authorizeRole = (...allowedRoles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }

    next();
  };
};
