import jwt from "jsonwebtoken"
import UserModel from "../model/user.model.js"

const getUserDetailFromToken = async (token) => {
    if (!token) {
        return {
            message: "Session ended",
            logout: true,
        };
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Fetch user details from the database
        const user = await UserModel.findById(decoded.id).select('-password');

        if (!user) {
            return {
                message: "User not found",
                logout: true,
            };
        }

        return user;
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            // Handle token expiration
            return {
                message: "Token expired. Please log in again.",
                logout: true,
            };
        } else if (err instanceof jwt.JsonWebTokenError) {
            // Handle invalid token
            return {
                message: "Invalid token. Please log in again.",
                logout: true,
            };
        } else {
            // Handle other errors
            console.error('Error verifying token:', err);
            return {
                message: "An error occurred. Please try again later.",
                logout: true,
            };
        }
    }
};

export default getUserDetailFromToken