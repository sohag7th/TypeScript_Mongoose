import { IOrders, IUser } from './user.interface';
import User from './user.model';

const createUserService = async (userData: IUser) => {
  // const result = await User.create(userData);
  let result;
  if (userData.orders && userData.orders.length > 0) {
    const newUser = new User(userData);
    result = await newUser.save();
  } else {
    console.log("else")
    // If orders field is not provided, create a user without it
    const { orders, ...userDataWithoutOrders } = userData;
    const newUser = new User(userDataWithoutOrders);
    result = await newUser.save();
  }

  console.log(result)
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

const updateUserOrderService = async (userId: string, order: IOrders) => {

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
};


const getSungleUserOrderService = async (userId: string) => {

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
};

const getTotalPriceOfOrderService = async (userId: string) => {

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
        _id: 0, // Exclude _id from the result
        totalPrice: 1 // Include examTotal in the result
      }
    }
  ]);
  return result;
};

const deleteUserService = async (userId: string) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found!');
  }
  await User.deleteOne({ userId: Number(userId) });
};

export const UserServices = {
  createUserService,
  getAllUsersService,
  getSungleUserService,
  getSungleUserOrderService,
  getTotalPriceOfOrderService,
  updateUserService,
  updateUserOrderService,
  deleteUserService,
};
