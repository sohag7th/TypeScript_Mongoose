import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/:userId', UserController.getSingleUser);
router.get('/:userId/orders/total-price', UserController.getTotalPriceOrders);
router.get('/:userId/orders', UserController.getSingleUserOrders);
router.put('/:userId/orders', UserController.createOrderForUser);
router.put('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);
router.get('/', UserController.getAllUsers);

export const UserRoute = router;
