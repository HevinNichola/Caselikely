import express from 'express';
const router = express.Router();
import {
  addCustomizedOrder,
  getUserCustomizedOrders,
  getAllCustomizedOrders,
  getCustomizedOrderById,
  updateCustomizedOrderToPaid,
  updateCustomizedOrderToDelivered,
  deleteCustomizedOrder,
} from '../controllers/customizedOrderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addCustomizedOrder).get(protect, admin, getAllCustomizedOrders);
router.route('/myorders').get(protect, getUserCustomizedOrders);
router.route('/:id').get(protect, getCustomizedOrderById);
router.route('/:id/pay').put(protect, updateCustomizedOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateCustomizedOrderToDelivered);
router.route('/:id').delete(protect, admin, deleteCustomizedOrder);

export default router;
