import UserModel, { IUser } from '@/models/User';
import bcrypt from 'bcrypt';

export const createUser = async (userData: any): Promise<IUser> => {
  const { email, password } = userData;
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error('Email already in use');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new UserModel({
    email,
    password: hashedPassword,
  });
  await user.save();
  return user;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<IUser | null> => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    return null;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }
  return user;
};

export const saveRefreshToken = async (
  userId: string,
  refreshToken: string
): Promise<void> => {
  await UserModel.findByIdAndUpdate(userId, { refreshToken });
};
