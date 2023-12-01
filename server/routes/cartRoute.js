import express from 'express';
import { newCart, getCart, UpdateCart, deleteCart } from '../controllers/cartController.js';

const router = express.Router();

// Route to create a new cart
router.post('/', newCart);

// Route to get a cart
router.get('/:userId', getCart);

// Route to update a cart
router.put('/:userId', UpdateCart);

// Route to delete a cart
router.delete('/:userId', deleteCart);

export default router;