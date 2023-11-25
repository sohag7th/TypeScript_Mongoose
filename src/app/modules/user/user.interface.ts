import { Model } from 'mongoose';

export interface IUserFullName {
  firstName: string;
  lastName: string;
}

export interface IAddress {
  street: string;
  city: string;
  country: string;
}

export interface IOrders {
  productName: string;
  price: number;
  quantity: number;
}

export interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName: IUserFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: IAddress;
  orders?: string | IOrders[];
}

//for creating static

export interface UserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<IUser | null>;
  isOrderExists(id: string): Promise<IUser | null>;
}
