import React, {useState, useEffect} from 'react'
import {useForm , useWatch} from 'react-hook-form'
import def from '../assets/default.jpg'
import { FaPen } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { uploadFile } from '../helpers/uploadFile';
import axios from 'axios';
import toast from 'react-hot-toast';
function Register() {
  const {register, handleSubmit, control} = useForm()
  const [image, setImage] = useState()
  const navigate = useNavigate()
  const profile_pic = useWatch({
    name: "profile_pic", // watch the Image field
    control, // control comes from useForm
    defaultValue: null, // set a default value
  });
  const submit = async (data) => {
    console.log(data);
    const uploadedimage = await uploadFile(data.profile_pic[0])

    try {
      console.log(uploadedimage);
      const res = await axios.post('http://localhost:3000/api/user/register',{...data,profile_pic:uploadedimage})
      console.log(res);
      toast.success(res.data.message)
      if(res.data.success){
        navigate('/email')
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  useEffect(()=>{
    if(profile_pic){
      setImage(URL.createObjectURL(profile_pic[0]))
      }
  },[profile_pic])
  return (
    <div className=' mt-5 flex items-center justify-center'>
      <div className=' bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4'>
        <h1 className=' text-center'>Welcome to our Chat app</h1>
        <form onSubmit={handleSubmit(submit)} className='grid gap-2 mt-5'>
            <div >
              <label htmlFor="profile_pic" className=' flex items-center justify-center' >
                <div className=' relative w-fit'>
                  <img src={image ? image : def} alt="" className='h-24 w-24 rounded-full border-[3px]'/>
                  <div className='bg-white p-[5px] border-[3px] h-8 w-8 flex items-center justify-center rounded-full absolute right-0 bottom-1'><FaPen /></div>
                </div>
              </label>
              <input type="file" name="profile_pic" id="profile_pic" {...register("profile_pic")} hidden />
            </div>
            <div className=' flex flex-col gap-1'>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" {...register("name")} required placeholder=' Enter your name' className=' bg-slate-100 rounded-md px-2 py-1 border'/>
            </div>
            <div className=' flex flex-col gap-1'>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" {...register("email")} required placeholder=' Enter your email' className=' bg-slate-100 rounded-md px-2 py-1 border'/>
            </div>
            <div className=' flex flex-col gap-1'>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" {...register("password")} required placeholder=' Enter your email' className=' bg-slate-100 rounded-md px-2 py-1 border'/>
            </div>
            <button className=' bg-slate-600 hover:bg-slate-700 rounded-md text-lg h-8 mt-5 font-semibold text-white'>
              Register
            </button>
        </form>
        <p className=' text-center mt-2'>Already have an account? <Link to={'/email'} className=' text-sky-500 hover:underline'>Login</Link></p>
      </div>
    </div>
  )
}

export default Register