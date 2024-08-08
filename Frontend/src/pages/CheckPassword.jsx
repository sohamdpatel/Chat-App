
import React, {useState, useEffect} from 'react'
import {useForm , useWatch} from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Avatar from '../component/avatar'
import { useDispatch } from 'react-redux';
import { setToken } from '../store/userSlice';
function CheckPassword() {  


  const {register, handleSubmit, control} = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location);
  useEffect(() => {
    if(!location?.state?.name){
      navigate('/email')
    }
  },[])
  const submit = async (data) => {
    console.log(data);

    try {
      const res = await axios.post('http://localhost:3000/api/user/checkpassword',{...data,userId: location.state._id },{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log(res);
      toast.success(res.data.message)
      if(res.data.success){
        dispatch(setToken(res.data.token))
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }


  return (
    <div className=' mt-5 flex items-center justify-center'>
      <div className=' bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4'>
        <div className=' flex justify-center'>
          <Avatar imageUrl={location?.state?.profile_pic} name={location?.state?.name} height={70} width={70} className={' flex items-center justify-center'}/>
        </div>
        <h1 className=' text-center  my-2'>Welcome {name} to our Chat app</h1>
        <form onSubmit={handleSubmit(submit)} className='grid gap-2 mt-5'>
            
            <div className=' flex flex-col gap-1'>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" {...register("password")} required placeholder=' Enter your password' className=' bg-slate-100 rounded-md px-2 py-1 border'/>
            </div>
            
            <button className=' bg-slate-600 hover:bg-slate-700 rounded-md text-lg h-8 mt-5 font-semibold text-white'>
              Login
            </button>
        </form>
        <Link to={'/forgot-password'} className=' text-sky-500 hover:underline'>Forgot Password?</Link>
      </div>
    </div>
  )
}

export default CheckPassword