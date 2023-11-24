export interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: string;
  email: string;
  isActive: boolean;
  hobbies: [string];
  address: {
    street: string;
    city: string;
    country: string;
  };
}
