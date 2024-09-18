import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
// config dotenv
dotenv.config({path: './config/.env',});
import connectDB from './config/connnectDB.js';
import router from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import {app,server} from './socket/index.js'
// make app of express
// configure cors
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true
}));
// json config
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 8080;

// connect to mongodb
connectDB();

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// test api server
app.get('/', (req, res) => {
    res.send('Hello from Backend');
});

// api endpoints
app.use('/api/user', router);