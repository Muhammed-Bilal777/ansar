import { Router } from 'express';
import {
  getAllUsers,
  getUser,
  loggingOut,
  loginUser,
  registerUser,
  updateUser,
} from '../controllers/user.controller.js';
import { validate } from '../middlewares/validate.js';
import { createUserSchema } from '../validators/user.validator.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';
import { testController } from '../controllers/test.controller.js';

export const userRouter = Router();

userRouter.post('/register', validate(createUserSchema), registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', loggingOut);

userRouter.put('/me', authenticateUser, updateUser);
userRouter.get('/me', authenticateUser, getUser);

//testing route with auth
userRouter.get('/auth', authenticateUser, testController);
