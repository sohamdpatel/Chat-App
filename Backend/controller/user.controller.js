
import UserModel from "../model/user.model.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import getUserDetailFromToken from "../utils/getUserDetailFromToken.js";

// user register
async function registerUser(req, res) {
    try {
        const { name, email, password, profile_pic} = req.body;
        // check if user already exists
        const checkUser = await UserModel.findOne({ email })

        if (checkUser) {
            return res.status(400).json({
                message: "User already exists",
                error: true
            })
        }
        // bcrypt password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const payload = {
            name,
            email,
            profile_pic,
            password: hashedPassword
        }

        const user = new UserModel(payload)
        const userData = await user.save()

        return res.status(201).json({
            message: "User registered successfully",
            data: userData,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error:true
        })
    }
}
// check email of user
async function checkUserEmail(req,res) {
    try {
        const {email} = req.body
        const checkEmail = await UserModel.findOne({email}).select("-password")

        if (!checkEmail) {
            return res.status(400).json({
                message: "Email doesn't exists",
                error: true
            })
        }
        return res.status(200).json({
            message: "Email verified",
            error: false,
            data: checkEmail
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error:true
        })
    }
}
// check password of user
async function checkUserPassword(req,res) {
    try {
        const {password,userId} = req.body
        // check user
        const checkUser = await UserModel.findById(userId)

        if (!checkUser) {
            return res.status(400).json({
                message: "User doesn't exists",
                error: true
            })
        }
        // compare password
        const isMatch = await bcryptjs.compare(password, checkUser.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "Password is incorrect",
                error: true
            })
        }
        // generate token
        const tokenData = {
            id:checkUser._id,
            email: checkUser.email
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
        // set cookie option
        const cookieOption = {
            http: true,
        }

        return res.cookie('token',token,cookieOption).status(200).json({
            message: "Password verified",
            token: token,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error:true
        })
    }
}
// get user detail
async function getUserDetails(req, res) {
    try {
        const token = req.cookies.token || ""

        const user = await getUserDetailFromToken(token)

        return res.status(200).json({
            message: "User details fetched successfully",
            data: user,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error:true
        })
    }
}
// logout user
async function logout(req, res) {
    try {
        const cookieOption = {
            http: true,
            secure: true
        }

        return res.cookie('token',"",cookieOption).status(200).json({
            message: "session out",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error:true
        })
    }
}
// update user
async function updateUser(req, res) {
    try {
        const token = req.cookies.token || ""

        const user = await getUserDetailFromToken(token)

        const {name, profile_pic} = req.body
        const updateUser = await UserModel.findByIdAndUpdate(user._id, {name, profile_pic})
        const updatedUser = await UserModel.findById(updateUser._id)
        return res.status(200).json({
            message: "User updated successfully",
            data: updatedUser,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error:true
        })
    }
}

export {registerUser,checkUserEmail,checkUserPassword,getUserDetails,logout,updateUser}