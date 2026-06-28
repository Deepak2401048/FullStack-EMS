import express from 'express';
import cors from 'cors';
import "dotenv/config";
import multer from 'multer';
import connectDB from './config/db.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(multer().none()); 

// Routes
app.get('/', (req, res) => {
  res.send('server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB(); // Connect to MongoDB
