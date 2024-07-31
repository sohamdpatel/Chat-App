import React, {useState, useEffect} from 'react'
import {useForm , useWatch} from 'react-hook-form'
import def from '../assets/default.jpg'
import { FaPen } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { uploadFile } from '../helpers/uploadFile';
import axios from 'axios';
import toast from 'react-hot-toast';

function CheckEmail() {


  const {register, handleSubmit, control} = useForm()
  const navigate = useNavigate()
  
  const submit = async (data) => {
    console.log(data);

    try {
      const res = await axios.post('http://localhost:3000/api/user/checkemail',{...data})
      console.log(res);
      toast.success(res.data.message)
      if(!res.data.error){
        navigate('/password',
          {state : res?.data.data}
        )
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }


  return (
    <div className=' mt-5 flex items-center justify-center'>
      <div className=' bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4'>
        <h1 className=' text-center'>Welcome to our Chat app</h1>
        <form onSubmit={handleSubmit(submit)} className='grid gap-2 mt-5'>
            
            <div className=' flex flex-col gap-1'>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" {...register("email")} required placeholder=' Enter your email' className=' bg-slate-100 rounded-md px-2 py-1 border'/>
            </div>
            
            <button className=' bg-slate-600 hover:bg-slate-700 rounded-md text-lg h-8 mt-5 font-semibold text-white'>
              Let's go
            </button>
        </form>
        <p className=' text-center mt-2'>You don't have an account? <Link to={'/register'} className=' text-sky-500 hover:underline'>Register</Link></p>
      </div>
    </div>
  )
}

export default CheckEmail