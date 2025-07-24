// controllers/donation.controller.ts
import { Request, Response } from 'express';
import { Donation } from '../models/donation.model';
import { User } from '../models/user.model';

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
    const userId = req.user?.id;

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

    const now = new Date();

    // Check if user already donated in Donation model
    const existingDonorIndex = donation.donors.findIndex(
      (donor) => donor.userId.toString() === userId
    );

    if (existingDonorIndex >= 0) {
      donation.donors[existingDonorIndex].amount += amount;
      donation.donors[existingDonorIndex].donatedAt = now;
    } else {
      donation.donors.push({
        userId,
        amount,
        donatedAt: now,
      });
    }

    donation.currentAmount += amount;
    await donation.save();

    // ✅ Update the user's donatedTo array
    const user = await User.findById(userId);

    if (user) {
      const existingDonation = user.donatedTo.find(
        (d) => d.donationId.toString() === donation._id.toString()
      );

      if (existingDonation) {
        // Update existing donation record
        existingDonation.amount += amount;
        existingDonation.donatedAt = now;
      } else {
        // Add new donation record
        user.donatedTo.push({
          donationId: donation._id,
          amount,
          donatedAt: now,
        });
      }

      await user.save();
    }

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
        userId,
        amount,
        donatedAt: now,
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
