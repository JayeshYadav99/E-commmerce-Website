import express from "express";
import { createOrder ,getOrderForUser,getOrderByOrderId} from "../controllers/orderController.js";
const router = express.Router();
router.post("/create-order", createOrder);
router.get("/get-order/:userId", getOrderForUser);
router.get("/get-order-by-id/:orderId", getOrderByOrderId);

export default router;