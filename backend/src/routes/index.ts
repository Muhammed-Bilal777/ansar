import { Router } from 'express';
import { userRouter } from './user.routes';
import { adminRouter } from './admin.routes';
import { AdmindonationRouter, donationRouter } from './donation.routes';
export const appRouter = Router();

//User
appRouter.use('/users', userRouter);

//Admin
appRouter.use('/admin', adminRouter);

//donation
appRouter.use('/donation', donationRouter);

appRouter.use('/admin', AdmindonationRouter);
