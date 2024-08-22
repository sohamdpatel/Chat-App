import React, { useState } from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import Avatar from "../component/avatar"
import { useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
function Sidebar() {

    const user = useSelector(state => state?.user)
    const [editUserOpen,setEditUserOpen] = useState(false)

  return (
    <div className=' w-full h-full'>
        <div className=' bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between'>
            <div>
                <NavLink className={({isActive}) => `flex justify-center items-center cursor-pointer w-12 h-12 hover:bg-slate-200 ${isActive && "bg-slate-200"}`} title='chat' >
                    <IoChatbubbleEllipses size={20}  />
                </NavLink>
                <div className=' flex justify-center items-center cursor-pointer w-12 h-12 hover:bg-slate-200' title='add friend'>
                    <FaUserPlus size={20}  />
                </div>
            </div>
            <div className=' flex flex-col items-center'>
                <button className=' mx-auto' title={user.name} onClick={() => setEditUserOpen(true)}>
                    {user.profile_pic ? <Avatar width={40} height={40} name={user?.name} imageUrl={user.profile_pic}/> : <Avatar width={40} height={40} name={user?.name} />}
                </button>
                <button title='logout' className=' flex justify-center items-center cursor-pointer w-12 h-12 hover:bg-slate-200'>
                    <span className=' -ml-2'>
                        <BiLogOut size={20} />
                    </span>
                </button>
            </div>
        </div>
        {/* edit user details */}
        {
            editUserOpen && (
                <EditUserDetails onClose={()=>setEditUserOpen(false)} data1={user}/>
            )  // editUserOpen  &&  end
        }
    </div>
  )
}

export default Sidebar