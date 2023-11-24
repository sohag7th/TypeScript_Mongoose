import { Schema, model } from 'mongoose';
import { IAddress, IOrders, IUser, IUserFullName } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userFullNameSchema = new Schema<IUserFullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required!'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required!'],
  },
});

const addressSchema = new Schema<IAddress>({
  street: {
    type: String,
    required: [true, 'Street is required!'],
  },
  city: {
    type: String,
    required: [true, 'City is required!'],
  },
  country: {
    type: String,
    required: [true, 'Country is required!'],
  },
});

const ordersSchema = new Schema<IOrders>({
  productName: {
    type: String,
    required: [true, 'Product name is required!'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required!'],
    validate: {
      validator: (value: number) => Number.isInteger(value) && value > 0,
      message: 'Price must be a positive integer!',
    },
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required!'],
    validate: {
      validator: (value: number) => Number.isInteger(value) && value > 0,
      message: 'Quantity must be a positive integer!',
    },
  },
});

const userSchema = new Schema<IUser>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'User ID is required!'],
    validate: {
      validator: async function (value: number): Promise<boolean> {
        const existingUser = await User.findOne({ userId: value });
        return !existingUser;
      },
      message: 'User ID must be unique!',
    },
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
  },
  fullName: {
    type: userFullNameSchema,
    required: [true, 'Full name is required!'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required!'],
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: [
    {
      type: String,
    },
  ],
  address: {
    type: addressSchema,
    required: [true, 'Address is required!'],
  },
  orders: ordersSchema,
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware / hook
userSchema.post('save', function (doc, next) {
  next();
});

const User = model<IUser>('User', userSchema);

export default User;
