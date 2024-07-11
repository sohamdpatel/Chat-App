import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"required name"]
    },
    email:{
        type: String,
        required: [true,"required email"],
        unique: true
    },
    password:{
        type: String,
        required: [true,"required password"],
    },
    profiel_pic:{
        type: String,
        default: ""
    }
},{
    timestamps: true
})

const UserModel = mongoose.model("User",userSchema);
export default UserModel;