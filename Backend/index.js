import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"

dotenv.config({path: './config/.env',});
import connectDB from './config/connnectDB.js';

const app = express();
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true
}));

const PORT = process.env.PORT || 8080;
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello from Backend');
});