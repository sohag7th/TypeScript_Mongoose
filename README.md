# Mongoose Express CRUD Mastery

#### Features

- User-friendly readable messages, configurable via options;
- Maintain original errors under `error.details`;

## Clone Repository

```
git clone https://github.com/sohag7th/TypeScript_Mongoose.git

```

#### Requirements

- Node.js v.18+
- TypeScript v.4.5+

## Installation

```bash
npm install
```

## Quick start

```
npm run start:dev
```

# API

## 2. Retrieve a list of all users

// List of user objects. Each object should only contain username, fullName, age, email, address .

```
 GET: https://type-ebon.vercel.app/api/users

```

## 2. Create a new user

// List of user objects. Each object should only contain username, fullName, age, email, address .

```
 POST:  https://type-ebon.vercel.app/api/users

```

```Request Body:
{
    "userId": "number",
    "username": "string",
    "password": "string",
    "fullName": {
        "firstName": "string",
        "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "isActive": "boolean",
    "hobbies": [
        "string",
        "string"
    ],
    "address": {
        "street": "string",
        "city": "string",
        "country": "string"
    }
}
```

## 3. Retrieve a specific user by ID

```
 GET: https://type-ebon.vercel.app/api/users/:userId

```

```response
{
    "success": true,
    "message": "User fetched successfully!",
    "data": {
        "userId": "number",
        "username": "string",
        "fullName": {
            "firstName": "string",
            "lastName": "string"
        },
        "age": "number",
        "email": "string",
        "isActive": "boolean",
        "hobbies": [
            "string",
            "string"
        ],
        "address": {
            "street": "string",
            "city": "string",
            "country": "string"
        }
    }
}
```

## 4. Update user information

```
 PUT : https://type-ebon.vercel.app/api/users/:userId

```

```response
{
    "success": true,
    "message": "User updated successfully!",
    "data": {
        "userId": "number",
        "username": "string",
        "fullName": {
            "firstName": "string",
            "lastName": "string"
        },
        "age": "number",
        "email": "string",
        "isActive": "boolean",
        "hobbies": [
            "string",
            "string"
        ],
        "address": {
            "street": "string",
            "city": "string",
            "country": "string"
        }
    }
}
```

## 5. Delete a user

```
 DELETE  : https://type-ebon.vercel.app/api/users/:userId

```

```response
{
	"success": true,
	"message": "User deleted successfully!",
	"data" : null
}
```

## 6.Add New Product in Order

```
 PUT  : https://type-ebon.vercel.app/api/users/:userId/orders

 {
    "productName": "string",
    "price": "number",
    "quantity": "number"
}

```

```response
{
    "success": true,
    "message": "Order created successfully!",
    "data": null
}
```

## 7. Retrieve all orders for a specific user

```
 GET   : https://type-ebon.vercel.app/api/users/:userId/orders

```

```response
{
    "success": true,
    "message": "Order fetched successfully!",
    "data": {
        "orders": [
            {
                "productName": "Product 1",
                "price": 23.56,
                "quantity": 2
            },
            {
                "productName": "Product 2",
                "price": 23.56,
                "quantity": 5
            }
        ]
    }
}
```

## 8. Calculate Total Price of Orders for a Specific User

```
 PUT  : https://type-ebon.vercel.app/api/users/:userId/orders
```

```response
{
    "success": true,
    "message": "Total price calculated successfully!",
    "data": {
        "totalPrice": 454.32
    }
}
```
