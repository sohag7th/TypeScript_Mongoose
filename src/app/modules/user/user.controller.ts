/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { ordersValidationSchema, userValidationSchema } from './user.validation';
import { ZodError } from 'zod';

const createUser = async (req: Request, res: Response) => {
  try {
    const zodParsedData = userValidationSchema.parse(req.body);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, prefer-const
    const result = await UserServices.createUserService(zodParsedData);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: error.message,
      },
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserService(userId);
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any 
  try {
    const zodParsedData = userValidationSchema.parse(req.body);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, prefer-const
    const result: any = await UserServices.updateUserService(zodParsedData);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, _id, __v, orders, ...userWithoutPassword } = result.toObject();
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: error.errors.map((err) => ({
          code: 404,
          description: `${err.path} is ${err.message}`,
        })),
      });
    } else {
      res.status(404).json({
        success: false,
        message: error.message,
        error: {
          code: 404,
          description: error.message,
        },
      });
    }
  }
};

const createOrderForUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const zodParsedData = ordersValidationSchema.parse(req.body);

    await UserServices.createOrderForUserService(userId, zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: error.errors.map((err) => ({
          code: 404,
          description: err.message,
        })),
      });
    } else {
      res.status(404).json({
        success: false,
        message: error.message,
        error: {
          code: 404,
          description: error.message,
        },
      });
    }

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: error.message,
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
  createOrderForUser,
  deleteUser,
};
