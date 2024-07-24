import React from 'react'
import {useForm} from 'react-hook-form'
import def from '../assets/default.jpg'
import { FaPen } from "react-icons/fa";
function Register() {
  const {register, handleSubmit} = useForm()
  const submit = (data) => {

  }
  return (
    <div className=' mt-5'>
      <div className=' bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4'>
        <h1>Welcome to our Chat app</h1>
        <form onSubmit={handleSubmit(submit)} className='grid gap-2 mt-5'>
            <div >
              <label htmlFor="profile_pic" className=' flex items-center justify-center' >
                <div className=' relative w-fit'>
                  <img src={def} alt="" srcset="" className='h-24 w-24 rounded-full border-[3px]'/>
                  <div className='bg-white p-[5px] border-[3px] h-8 w-8 flex items-center justify-center rounded-full absolute right-0 bottom-1'><FaPen /></div>
                </div>
              </label>
              <input type="file" name="profile_pic" id="profile_pic" hidden />
            </div>
            <div className=' flex flex-col gap-1'>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" {...register("name")} required placeholder=' Enter your name' className=' bg-slate-100 px-2 py-1 border'/>
            </div>
            <div className=' flex flex-col gap-1'>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" {...register("email")} required placeholder=' Enter your email' className=' bg-slate-100 px-2 py-1 border'/>
            </div>
            <div className=' flex flex-col gap-1'>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" {...register("password")} required placeholder=' Enter your email' className=' bg-slate-100 px-2 py-1 border'/>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Register