import { Router } from 'express';
import { authorizeRole } from '../controllers/admin.controller.js';
import { getAllUsers } from '../controllers/user.controller.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

export const adminRouter = Router();

//admin routes
adminRouter.get(
  '/users',
  authenticateUser,
  authorizeRole('admin'),
  getAllUsers
);
