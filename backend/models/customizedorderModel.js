import mongoose from 'mongoose';

const customizedOrderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    screenshot: {
      type: String, // Path to the screenshot image
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneModel: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const CustomizedOrder = mongoose.model('CustomizedOrder', customizedOrderSchema);

export default CustomizedOrder;
