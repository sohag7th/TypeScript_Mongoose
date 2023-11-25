import { z } from 'zod';

// Define schemas for subtypes
const userFullNameValidationSchema = z.object({
    firstName: z.string().refine(data => data.trim() !== '', {
        message: 'First name is required!',
    }),
    lastName: z.string().refine(data => data.trim() !== '', {
        message: 'Last name is required!',
    }),
});

const addressValidationSchema = z.object({
    street: z.string().refine(data => data.trim() !== '', {
        message: 'Street is required!',
    }),
    city: z.string().refine(data => data.trim() !== '', {
        message: 'City is required!',
    }),
    country: z.string().refine(data => data.trim() !== '', {
        message: 'Country is required!',
    }),
});

export const ordersValidationSchema = z.object({
    productName: z.string().refine(data => data.trim() !== '', {
        message: 'Product name is required!',
    }),
    price: z.number().positive('Price must be a positive number!'),
    quantity: z.number().positive('Quantity must be a positive number!'),
});

// Define the main user schema

export const userValidationSchema = z.object({
    userId: z.number().int().positive('User ID must be a positive integer!'),
    username: z.string().min(1, 'Username is required!'),
    password: z.string().min(1, 'Password is required!'),
    fullName: userFullNameValidationSchema.refine(data => Object.values(data).every(val => val.trim() !== ''), {
        message: 'Full name is required!',
    }),
    age: z.number().positive('Age must be a positive number!'),
    email: z.string().email('Invalid email format!').min(1, 'Email is required!'),
    isActive: z.boolean().default(true),
    hobbies: z.array(z.string()),
    address: addressValidationSchema.refine(data => Object.values(data).every(val => val.trim() !== ''), {
        message: 'Address is required!',
    }),
    orders: z.optional(z.array(ordersValidationSchema)),
});

