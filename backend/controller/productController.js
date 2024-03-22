import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";


//@desc fetch all products
//@route Get/api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);

});

//@desc fetch a product
//@route Get/api/products/:id
//@access Public
const getProductsById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(product){
      return res.json(product)
    } else{
     res.status(404);
     throw new Error('Resource not found');
    }
});

//@desc  Create a products
//@route POST/api/products
//@access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
   const product = new Product({
     name: 'Sample name',
     price: 0,
     user: req.user._id,
     image: '/images/sample.jpg',
     brand: 'Sample brand',
     category: 'Sample category',
     countInStock: 0,
     numReviews: 0,
     description: 'Sample description',
   })

   const createdProduct = await product.save();
   res.status(201).json(createProduct);

});

//@desc  Update a product
//@route PUT/api/products/:id
//@access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
   const { name, price, description, image, brand, category, countInStock} = req.body;

   const product = await Product.findById(req.params.id);

   if(product) {

     product.name = name;
     product.price = price;
     product.description = description;
     product.image = image;
     product.brand = brand;
     product.category = category;
     product.countInStock = countInStock;

     const updatedProduct = await product.save();
     res.json(updatedProduct);
     
   } else{
     res.status(404);
     throw new Error('Resource not found')
   }

});


//@desc  Delete a product
//@route DELETE /api/products/:id
//@access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
 
  const product = await Product.findById(req.params.id);

  if(product) {
     await Product.deleteOne({ _id: product._id });
     res.status(200).json({ message: 'Product deleted'});   
  } else{
    res.status(404);
    throw new Error('Resource not found')
  }

});


//@desc  Create a new review
//@route POST /api/products/:id/reviews
//@access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment} = req.body;

  
 
  const product = await Product.findById(req.params.id);

  if(product) {
     await Product.deleteOne({ _id: product._id });
     res.status(200).json({ message: 'Product deleted'});   
  } else{
    res.status(404);
    throw new Error('Resource not found')
  }

});

export { 
  getProducts,
  getProductsById, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
};