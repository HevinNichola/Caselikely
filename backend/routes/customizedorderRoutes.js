import express from 'express';
const router = express.Router();
import {
  addCustomizedOrder,
  getUserCustomizedOrders,
  getAllCustomizedOrders,
  getCustomizedOrderById,
  updateCustomizedOrderPrice,
  updateCustomizedOrderToPaid,
  updateCustomizedOrderToDelivered,
  deleteCustomizedOrder,
  addShippingDetails,
  updateCustomizedOrderPaymentMethod,
} from '../controller/customizedorderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addCustomizedOrder).get(protect, admin, getAllCustomizedOrders);
router.route('/myorders').get(protect, getUserCustomizedOrders);
router.route('/:id').get(protect, getCustomizedOrderById);
router.route('/:id/price').put(protect, admin, updateCustomizedOrderPrice);
router.route('/:id/pay').put(protect, updateCustomizedOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateCustomizedOrderToDelivered);
router.route('/:id').delete(protect, admin, deleteCustomizedOrder);
router.route('/:id/customizeshipping').put(protect, addShippingDetails);
router.route('/:id/customizepayment').put(protect, updateCustomizedOrderPaymentMethod); 

export default router;