import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { ordersValidationSchema, userValidationSchema } from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const zodParsedData = userValidationSchema.parse(userData);

    const result = await UserServices.createUserService(zodParsedData);

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
      message: 'Users fetched successfully!',
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
      message: 'User fetched successfully!',
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



const updateUser = async (req: Request, res: Response) => {
  try {
    console.log(' obhed ');
    const result = await UserServices.updateUserService(req.body);

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
      message: 'User updated successfully!',
      data: userWithoutPassword,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const updateOrderUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const zodParsedData = ordersValidationSchema.parse(req.body);

    await UserServices.updateUserOrderService(userId, zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getSingleUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSungleUserOrderService(userId);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      "error": {
        "code": 404,
        "description": error.message
      }
    });
  }
};

const getTotalPriceOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getTotalPriceOfOrderService(userId);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      "error": {
        "code": 404,
        "description": error.message
      }
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await UserServices.deleteUserService(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  getSingleUserOrders,
  getTotalPriceOrders,
  updateUser,
  updateOrderUser,
  deleteUser,
};
