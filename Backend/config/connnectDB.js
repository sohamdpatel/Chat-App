import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const connection = mongoose.connection
        connection.on("connected", () =>  console.log("MongoDB connected successfully"));

        connection.on("error", (error) => console.log("MongoDB error " , error));
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
}

export default connectDB;