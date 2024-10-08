import express from 'express';
import { checkUserEmail, checkUserPassword, getUserDetails, logout, registerUser, searchUser, updateUser } from '../controller/user.controller.js';

const router = express.Router()

router.post('/register', registerUser)
router.post("/checkemail", checkUserEmail)
router.post("/checkpassword", checkUserPassword)
router.post("/updateuser", updateUser)
router.get('/getuser', getUserDetails)
router.get('/logout', logout)
router.post('/searchuser',searchUser)

export default router;