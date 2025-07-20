// controllers/donation.controller.ts
import { Request, Response } from 'express';
import { Donation } from '../models/donation.model';

export const createDonation = async (req: any, res: Response) => {
  try {
    const { title, description, category, targetAmount, deadline, image } =
      req.body;

    const newDonation = await Donation.create({
      title,
      description,
      category,
      targetAmount,
      deadline,
      image,
      createdBy: req.user?.id, // set by authenticate middleware
    });

    res.status(201).json({ success: true, donation: newDonation });
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({ message: 'Failed to create donation campaign' });
  }
};

// controllers/donation.controller.ts

export const donateToCampaign = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid donation amount' });
    }

    const donation = await Donation.findOne({ slug: id });

    if (!donation) {
      return res.status(404).json({ message: 'Donation campaign not found' });
    }

    if (!donation.status) {
      return res
        .status(400)
        .json({ message: 'This donation campaign is not active' });
    }

    if (new Date() > donation.deadline) {
      return res
        .status(400)
        .json({ message: 'This donation campaign has expired' });
    }

    // Check if user already donated
    const existingDonorIndex = donation.donors.findIndex(
      (donor) => donor.userId.toString() === req.user?.id
    );

    if (existingDonorIndex >= 0) {
      // Update existing donor's amount & timestamp
      donation.donors[existingDonorIndex].amount += amount;
      donation.donors[existingDonorIndex].donatedAt = new Date();
    } else {
      // New donor
      donation.donors.push({
        userId: req.user?.id,
        amount,
        donatedAt: new Date(),
      });
    }

    donation.currentAmount += amount;

    await donation.save();

    const remaining = donation.targetAmount - donation.currentAmount;

    res.status(200).json({
      success: true,
      message: 'Donation successful',
      balanceRemaining: remaining < 0 ? 0 : remaining,
      donation: {
        title: donation.title,
        category: donation.category,
        currentAmount: donation.currentAmount,
        targetAmount: donation.targetAmount,
        deadline: donation.deadline,
        status: donation.status,
      },
      donor: {
        userId: req.user?.id,
        amount,
        donatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Donation error:', error);
    res.status(500).json({ message: 'Failed to donate' });
  }
};

export const getDonationBySlug = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    const donation = await Donation.findOne({ slug: id })
      .populate('createdBy', 'name email') // Optional: info about the admin who created it
      .populate('donors.userId', 'name email'); // Optional: info about donors

    if (!donation) {
      return res.status(404).json({ message: 'Donation campaign not found' });
    }

    res.status(200).json({ success: true, donation });
  } catch (error) {
    console.error('Error fetching donation by slug:', error);
    res.status(500).json({ message: 'Failed to retrieve donation' });
  }
};

export const AllDonation = async (req: any, res: Response) => {
  const donations = await Donation.find();
  res.status(200).json({
    message: 'all donation',
    donations: donations,
  });
};
