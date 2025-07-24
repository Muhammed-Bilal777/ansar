import { Request, Response, NextFunction } from 'express';
import logger from '../logger/logger';
import { hashPassword, comparePassword } from '../utils/hash.js';

import { User } from '../models/user.model';
import { signToken } from '../utils/jwt';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword, ...rest } = req.body;
    if (password !== confirmPassword) {
      console.log(password, confirmPassword);
      return res
        .status(400)
        .json({ message: 'Password and Confirm password is not matching' });
    }
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: 'Email already in use' });

    const hashed = await hashPassword(password);
    const user = await User.create({ ...rest, email, password: hashed });
    const userObj = user.toObject();
    const { password: Excludepassword, ...restUser } = userObj;

    res.status(201).json({ success: true, user: restUser });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });
    const expiresIn = 24 * 60 * 60 * 1000;
    const token = signToken(
      { id: user._id, role: user.role, email: user.email },
      expiresIn
    );
    const userObj = user.toObject();
    const { password: Excludepassword, ...restUser } = userObj;

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, token, user: restUser });
  } catch (error) {
    logger.error(error);
    console.log(error);
    res.status(500).json({ message: 'Login failed', error });
  }
};

export const loggingOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Session expired. Please log in again.',
      });
    }
    console.error('Logout error:', error);
    res.status(500).json({ success: false, message: 'Logout failed' });
  }
};

export const updateUser = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Extract only the allowed fields to update
    const { name, email, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, avatar },
      { new: true, runValidators: true }
    ).select('-password'); // exclude password from response

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Update failed', error });
  }
};

export const getUser = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Populate the donations the user has made (title, amount, etc.)
    const user = await User.findById(userId).select('-password -__v').populate({
      path: 'donatedTo.donationId',
      select: 'title category targetAmount currentAmount image', // choose fields to return
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({ message: 'Failed to fetch user profile' });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password -__v');
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};
