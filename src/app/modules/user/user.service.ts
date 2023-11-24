import { IUser } from './user.interface';
import User from './user.model';

const createUserService = async (userData: IUser) => {
  const result = await User.create(userData);

  return result;
};

const getAllUsersService = async () => {
  const result = await User.find(
    {},
    {
      username: 1,
      'fullName.firstName': 1,
      'fullName.lastName': 1,
      email: 1,
      age: 1,
      'address.street': 1,
      'address.city': 1,
      'address.country': 1,
      _id: 0,
    },
  );
  return result;
};
const getSungleUserService = async (userId: string) => {
  if (await User.isUserExists(userId)) {
    throw new Error('User already exists!');
  }

  const result = await User.find(
    { userId },
    {
      password: 0,
      'fullName._id': 0,
      'address._id': 0,
      orders: 0,
      _id: 0,
      __v: 0,
    },
  );
  return result;
};

const updateUserService = async (userData: IUser) => {
  if (!(await User.isUserExists(String(userData.userId)))) {
    throw new Error('User not found exists!');
  }
  console.log('userData.userId:', userData.userId);
  const result = await User.findOneAndUpdate(
    { userId: userData.userId },
    { ...userData },
    { new: true },
  );

  return result;
};

const deleteUserService = async (userId: string) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found exists!');
  }
  await User.deleteOne({ userId });
};

export const UserServices = {
  createUserService,
  getAllUsersService,
  getSungleUserService,
  updateUserService,
  deleteUserService,
};
