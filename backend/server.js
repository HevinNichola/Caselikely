import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import customizedOrderRoutes from './routes/customizedorderRoutes.js';

const port = process.env.PORT || 5000;

connectDB(); // connect to MangoDB

const app = express();

// // Body parser middleware
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

// Body parser middleware
app.use(express.json({ limit: '10mb' })); // Increase the limit as needed
app.use(express.urlencoded({ extended: true }));

//Cookie parser middleware
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('Api is running..')
});


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/customizedorders', customizedOrderRoutes);


app.get('/api/config/paypal', (req, res) => 

  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })

);

const __dirname = path.resolve(); //set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server running on port ${port}`));

