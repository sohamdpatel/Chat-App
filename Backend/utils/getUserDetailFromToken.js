import jwt from "jsonwebtoken"
import UserModel from "../model/user.model.js"

const getUserDetailFromToken = async (token) => {
    if (!token){
        return {
            message: "session ended",
            logout: true,
        }
    } 

    const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)

    const user = await UserModel.findById(decode.id).select('-password')

    return user
}

export default getUserDetailFromToken