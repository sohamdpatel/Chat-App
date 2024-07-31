import React, {useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'


function Home() {
  const getUserDetails = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/user/getuser',{
        withCredentials: true
      })
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [])
  return (
    <div>
      Home
      <section>
        <Outlet/>
      </section>
    </div>
  )
}

export default Home