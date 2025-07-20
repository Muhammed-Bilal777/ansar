import { Router } from 'express';
import { authenticateUser } from '../middlewares/authMiddleware';
import { authorizeRole } from '../controllers/admin.controller';
import {
  AllDonation,
  createDonation,
  donateToCampaign,
  getDonationBySlug,
} from '../controllers/donation.controller';

export const AdmindonationRouter = Router();
export const donationRouter = Router();

//admin
AdmindonationRouter.post(
  '/donation',
  authenticateUser,
  authorizeRole('admin'),
  createDonation
);
AdmindonationRouter.get(
  '/donation/:id',
  authenticateUser,
  authorizeRole('admin'),
  getDonationBySlug
);

//all donation
AdmindonationRouter.get(
  '/donations',
  authenticateUser,
  authorizeRole('admin'),
  AllDonation
);

//Donations
donationRouter.post('/:id', authenticateUser, donateToCampaign);
