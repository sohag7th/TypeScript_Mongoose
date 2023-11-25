
import { IOrders, IUser } from './user.interface';
import User from './user.model';

const createUserService = async (userData: IUser) => {
  // const result = await User.create(userData);

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { orders, ...userDataWithoutOrders } = userData;
  const newUser = new User(userDataWithoutOrders);
  const result = await newUser.save();

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

const getSingleUserService = async (userId: string) => {
  if (!await User.isUserExists(userId)) {
    throw new Error('User not found!');
  }

  const result = await User.find(
    { userId: Number(userId) },
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
  try {
    if (!(await User.isUserExists(String(userData.userId)))) {
      throw new Error('User not found!');
    }

    const result = await User.findOneAndUpdate(
      {
        userId: Number(userData.userId)
      },
      { ...userData },
      {
        new: true
      },
    );
    return result;
  } catch (error) {
    throw new Error('User not found!');
  }
};

const createOrderForUserService = async (userId: string, order: IOrders) => {
  try {
    if (!(await User.isUserExists(String(userId)))) {
      throw new Error('User not found!');
    }

    const orderex = await User.isOrderExists(userId);
    if (!orderex) {
      await User.aggregate([
        {
          $match: { userId: Number(userId) }
        },
        {
          $addFields: { orders: [order] }
        },
        {
          $merge: { into: "users" }
        }
      ])
    }
    else {
      await User.updateOne(
        {
          userId: Number(userId)
        },
        {
          $push: { orders: order }
        }
      )
    }
  } catch (error) {
    throw new Error('User not found!');
  }
};

const getSungleUserOrderService = async (userId: string) => {
  try {
    if (!await User.isUserExists(userId)) {
      throw new Error('User not found!');
    }

    if (! await User.isOrderExists(userId)) {
      throw new Error('Not order yet!');
    }

    const result = await User.find(
      { userId: Number(userId) },
      {
        orders: 1,
        _id: 0
      },
    );
    return result;
  } catch (error) {
    throw new Error('User not found!');
  }
};

const getTotalPriceOfOrderService = async (userId: string) => {
  try {
    if (!await User.isUserExists(userId)) {
      throw new Error('User not found!');
    }

    if (! await User.isOrderExists(userId)) {
      throw new Error('Not order yet!');
    }

    const result = await User.aggregate([
      {
        $match: { userId: Number(userId) }
      },
      {
        $unwind: "$orders"
      },
      {
        $group: {
          _id: null,
          totalPrice: { $sum: { $multiply: ["$orders.price", "$orders.quantity"] } }
        }
      },
      {
        $project: {
          _id: 0,
          totalPrice: 1
        }
      }
    ]);
    return result;
  } catch (error) {
    throw new Error('User not found!');
  }
};

const deleteUserService = async (userId: string) => {
  try {
    if (!(await User.isUserExists(userId))) {
      throw new Error('User not found!');
    }

    await User.deleteOne({ userId: Number(userId) });

  } catch (error) {
    throw new Error('User not found!');
  }
};

export const UserServices = {
  createUserService,
  getAllUsersService,
  getSingleUserService,
  getSungleUserOrderService,
  getTotalPriceOfOrderService,
  updateUserService,
  createOrderForUserService,
  deleteUserService,
};
