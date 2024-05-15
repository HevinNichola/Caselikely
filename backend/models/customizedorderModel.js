import mongoose from 'mongoose';

const customizedOrderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    
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
    shippingAddress: {
      address: { type: String,  },
      city: { type: String, },
      postalCode: { type: String,  },
      country: { type: String, },
    },
    paymentMethod: {
      type: String,
      
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    
  },
  {
    timestamps: true,
  }
);

const CustomizedOrder = mongoose.model('CustomizedOrder', customizedOrderSchema);

export default CustomizedOrder;
