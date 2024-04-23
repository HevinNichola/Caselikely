import asyncHandler from 'express-async-handler';
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
  const customizedOrders = await CustomizedOrder.find({}).populate('user', 'id name');
  res.json(customizedOrders);
});

const getCustomizedOrderById = asyncHandler(async (req, res) => {
  const customizedOrder = await CustomizedOrder.findById(req.params.id).populate('user', 'id name');
  
  if (customizedOrder) {
    res.json(customizedOrder);
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
    const updatedCustomizedOrder = await customizedOrder.save();
    res.json(updatedCustomizedOrder);
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
    res.json(updatedCustomizedOrder);
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

export {
  addCustomizedOrder,
  getUserCustomizedOrders,
  getAllCustomizedOrders,
  getCustomizedOrderById,
  updateCustomizedOrderToPaid,
  updateCustomizedOrderToDelivered,
  deleteCustomizedOrder,
};