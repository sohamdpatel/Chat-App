import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
function EditUserDetails({onClose, data}) {


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
    <div className=' fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex items-center justify-center'>
        <div className=' bg-white p-4 m-1 rounded w-full max-w-sm'>
            <h2 className=' font-semibold'>Profile</h2>
            <p className=' text-sm'>Edit your details</p>

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
        </div>
    </div>
  )
}

export default EditUserDetails