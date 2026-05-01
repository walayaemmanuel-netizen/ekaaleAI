import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import paymentRouter from './routes/payment.js';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

// Routes
app.use('/api/payments', paymentRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;