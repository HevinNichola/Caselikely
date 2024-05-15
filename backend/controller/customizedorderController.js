import asyncHandler from "../middleware/asyncHandler.js";
import CustomizedOrder from '../models/customizedorderModel.js';

const addCustomizedOrder = asyncHandler(async (req, res) => {
  const { screenshot, name, phoneModel, brand } = req.body;

  const customizedOrder = new CustomizedOrder({
    user: req.user._id,
    screenshot,
    name,
    phoneModel,
    brand,
  });

  const createdCustomizedOrder = await customizedOrder.save();
  res.status(201).json(createdCustomizedOrder);
});

const getUserCustomizedOrders = asyncHandler(async (req, res) => {
  const customizedOrders = await CustomizedOrder.find({ user: req.user._id });
  res.json(customizedOrders);
});

const getAllCustomizedOrders = asyncHandler(async (req, res) => {
  const customizedOrders = await CustomizedOrder.find({}).populate('user', 'id name email');
  res.json(customizedOrders);
});

const getCustomizedOrderById = asyncHandler(async (req, res) => {
  const customizedOrder = await CustomizedOrder.findById(req.params.id).populate('user', 'id name email');
  
  if (customizedOrder) {
    res.json(customizedOrder);
  } else {
    res.status(404);
    throw new Error('Customized order not found');
  }
});

const updateCustomizedOrderPrice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;

  const customizedOrder = await CustomizedOrder.findById(id);

  if (customizedOrder) {
    customizedOrder.price = price;
    const updatedCustomizedOrder = await customizedOrder.save();
    res.json(updatedCustomizedOrder);
  } else {
    res.status(404);
    throw new Error('Customized order not found');
  }
});

const updateCustomizedOrderToPaid = asyncHandler(async (req, res) => {
  const customizedOrder = await CustomizedOrder.findById(req.params.id);
  
  if (customizedOrder) {
    customizedOrder.isPaid = true;
    customizedOrder.paidAt = Date.now();
    customizedOrder.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,

  };
    const updatedCustomizedOrder = await customizedOrder.save();
    res.status(200).json(updatedCustomizedOrder);
  } else {
    res.status(404);
    throw new Error('Customized order not found');
  }
});

const updateCustomizedOrderToDelivered = asyncHandler(async (req, res) => {
  const customizedOrder = await CustomizedOrder.findById(req.params.id);
  
  if (customizedOrder) {
    customizedOrder.isDelivered = true;
    customizedOrder.deliveredAt = Date.now();
    const updatedCustomizedOrder = await customizedOrder.save();
    res.status(200).json(updatedCustomizedOrder);
  } else {
    res.status(404);
    throw new Error('Customized order not found');
  }
});

const deleteCustomizedOrder = asyncHandler(async (req, res) => {
  const customizedOrder = await CustomizedOrder.findById(req.params.id);
  
  if (customizedOrder) {
    await customizedOrder.remove();
    res.json({ message: 'Customized order removed' });
  } else {
    res.status(404);
    throw new Error('Customized order not found');
  }
});

const addShippingDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { shippingAddress } = req.body;

  const customizedOrder = await CustomizedOrder.findById(id);

  if (customizedOrder) {
    customizedOrder.shippingAddress = shippingAddress;
    const updatedCustomizedOrder = await customizedOrder.save();
    res.json(updatedCustomizedOrder);
  } else {
    res.status(404);
    throw new Error('Customized order not found');
  }
});

// In customizedorderController.js
const updateCustomizedOrderPaymentMethod = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { paymentMethod } = req.body;

  const customizedOrder = await CustomizedOrder.findById(id);

  if (customizedOrder) {
    customizedOrder.paymentMethod = paymentMethod;
    const updatedCustomizedOrder = await customizedOrder.save();
    res.json(updatedCustomizedOrder);
  } else {
    res.status(404);
    throw new Error('Customized order not found');
  }
});



export {
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
};