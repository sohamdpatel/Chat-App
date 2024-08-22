import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
import def from '../assets/default.jpg'
import { FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { uploadFile } from '../helpers/uploadFile';
import Avatar from './avatar';
import axios from 'axios';
import toast from 'react-hot-toast';
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
function EditUserDetails({ onClose, data1 }) {

  const dispatch = useDispatch()

  const { register, handleSubmit, control } = useForm()
  const [image, setImage] = useState()
  const navigate = useNavigate()
  const profile_pic = useWatch({
    name: "profile_pic", // watch the Image field
    control, // control comes from useForm
    defaultValue: null, // set a default value
  });
  const submit = async (data) => {
    console.log(data.profile_pic[0]);


    try {
      if (data.profile_pic[0]) {

        const uploadedimage = await uploadFile(data.profile_pic[0])
        console.log(uploadedimage);


        if (uploadedimage) {
          const res = await axios.post('http://localhost:3000/api/user/updateuser', { ...data, profile_pic: uploadedimage }, {
            withCredentials: true
          })
        toast.success(res.data.message)
        if (res.data.success) {
          dispatch(setUser(res.data.data))
          onClose()
        }
        }else{
          console.log("error in upload image");
          
        }
      } else {
        const res = await axios.post('http://localhost:3000/api/user/updateuser', { ...data,profile_pic: data1.profile_pic }, {
          withCredentials: true
        })
        toast.success(res.data.message)
        if (res.data.success) {
          dispatch(setUser(res.data.data))
          onClose()

        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (profile_pic) {
      setImage(URL.createObjectURL(profile_pic[0]))
    }
  }, [profile_pic])
console.log(image);

  return (
    <div className=' fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex items-center justify-center'>
      <div className=' bg-white p-4 m-1 rounded w-full max-w-sm relative py-10'>
        <RxCross2 onClick={onClose} className=' absolute h-6 w-6 right-2 top-2'/>
        <h2 className=' text-center font-semibold'>Profile</h2>
        <p className=' text-center text-sm'>Edit your details</p>

        <form onSubmit={handleSubmit(submit)} className='grid gap-2 mt-5'>
          <div >
            <label htmlFor="profile_pic" className=' flex items-center justify-center' >
              <div className=' relative w-fit'>
                {
                  image? <img src={image} alt="" className='h-24 w-24 rounded-full border-[3px]' /> : 
                  (data1?.profile_pic ? <Avatar width={96} height={96} name={data1?.name} imageUrl={data1?.profile_pic} /> : <Avatar width={96} height={96} name={data1?.name} />)
                }
                
                <div className='bg-white p-[5px] border-[3px] h-8 w-8 flex items-center justify-center rounded-full absolute right-0 bottom-1'><FaPen /></div>
              </div>
            </label>
            <input type="file" name="profile_pic" id="profile_pic" {...register("profile_pic")} hidden />
          </div>
          <div className=' flex flex-col gap-1'>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" {...register("name")} defaultValue={data1?.name} required placeholder=' Enter your name' className=' bg-slate-100 rounded-md px-2 py-1 border' />
          </div>
          <button className=' bg-slate-600 hover:bg-slate-700 rounded-md text-lg h-8 mt-5 font-semibold text-white'>
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditUserDetails