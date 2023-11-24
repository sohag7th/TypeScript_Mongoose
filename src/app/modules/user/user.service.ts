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
  const result = await User.find({ userId });
  return result;
};

export const UserServices = {
  createUserService,
  getAllUsersService,
  getSungleUserService,
};
