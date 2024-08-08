import React, {useEffect} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setUser } from '../store/userSlice'
import Sidebar from '../component/Sidebar'


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
      dispatch(setUser(res.data.data))
      if(res.data.logout){
        dispatch(logout())
        navigate('/email')
      }
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [])
  return (
    <div className=' grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
      <section className=' bg-white'>
        <Sidebar/>
      </section>
      <section>
        <Outlet/>
      </section>
    </div>
  )
}

export default Home