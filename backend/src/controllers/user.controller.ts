import { generateTokens } from '@/middleware/auth.middleware';
import { Request, Response } from 'express';
import * as userService from '@/services/user.service';
import { IUser } from '@/models/User';

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ message: 'User created', userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }
    const { accessToken, refreshToken } = generateTokens(user);
    await userService.saveRefreshToken(user.id, refreshToken);
    res.json({
      message: 'User logged in successfully',
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user as IUser;
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};
