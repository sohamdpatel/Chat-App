import React, {useEffect} from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setUser, setOnlineUser, setSocketConnection } from '../store/userSlice'
import Sidebar from '../component/Sidebar'
import io from 'socket.io-client'
import { BiSolidDockLeft } from 'react-icons/bi'

function Home() {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log(user);
  const getUserDetails = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/user/getuser',{
        withCredentials: true
      })
      console.log(res);
      
      if(res.data.data.logout){
        console.log("hello");
        
        
        dispatch(logout())
        navigate('/email')
      }
      dispatch(setUser(res.data.data))
      toast.success(res.data.message)
      
    } catch (error) {
      console.log(error);
      
      // toast.error(error.response.data.message)
    }
  }
  const location = useLocation()
  const basePath = location.pathname === '/'
  console.log(basePath);
  
  useEffect(() => {
    getUserDetails()
  }, [])
  useEffect(()=>{
    const socketConnection = io('http://localhost:3000',{
      auth:{
        token: localStorage.getItem('token'),
      }
    })

    socketConnection.on('onlineUser',(data) => {
      console.log(data);
      dispatch(setOnlineUser(data))
    })

    dispatch(setSocketConnection(socketConnection))
    return () => {
      socketConnection.disconnect()
    }
  },[])
  return (
    <div className=' grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
      <section className={`bg-white ${!basePath && 'hidden'} lg:block`}>
        <Sidebar/>
      </section>
      <section className={`${basePath && 'hidden'}`}>
        <Outlet/>
      </section>

      <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex" }`}>
            <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
        </div>
    </div>
  )
}

export default Home