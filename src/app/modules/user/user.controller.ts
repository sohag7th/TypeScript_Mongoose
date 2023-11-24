import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const result = await UserServices.createUserService(userData);

    const { password, _id, __v, ...userWithoutPassword } = result.toObject();
    userWithoutPassword.fullName = {
      firstName: userWithoutPassword.fullName.firstName,
      lastName: userWithoutPassword.fullName.lastName,
    };
    userWithoutPassword.address = {
      street: userWithoutPassword.address.street,
      city: userWithoutPassword.address.city,
      country: userWithoutPassword.address.country,
    };

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: userWithoutPassword,
    });
  } catch (error: any) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: 'Something is wrong',
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersService();
    res.status(200).json({
      success: true,
      message: 'Users get successfully!',
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'error ',
      data: [],
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSungleUserService(userId);
    res.status(200).json({
      success: true,
      message: 'Users get successfully!',
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'error ',
      data: [],
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
};
