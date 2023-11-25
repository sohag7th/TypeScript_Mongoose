import { z } from 'zod';

// Define schemas for subtypes
const userFullNameValidationSchema = z.object({
    firstName: z.string().trim(),
    lastName: z.string().trim(),
});

const addressValidationSchema = z.object({
    street: z.string().trim(),
    city: z.string().trim(),
    country: z.string().trim(),
});

export const ordersValidationSchema = z.object({
    productName: z.string().trim(),
    price: z.number().positive('Price must be a positive number!'),
    quantity: z.number().positive('Quantity must be a positive number!'),
});

// Define the main user schema

export const userValidationSchema = z.object({
    userId: z.number().int().positive('UserId must be a positive integer!'),
    username: z.string().min(1, 'Username is required!'),
    password: z.string().min(1, 'Password is required!'),
    fullName: userFullNameValidationSchema,
    age: z.number().positive('Age must be a positive number!'),
    email: z.string().email('Invalid email format!').min(1, 'Email is required!'),
    isActive: z.boolean().default(true),
    hobbies: z.array(z.string()),
    address: addressValidationSchema,
    orders: z.array(ordersValidationSchema).optional(),
});

