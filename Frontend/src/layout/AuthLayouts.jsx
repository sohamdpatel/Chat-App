import React from 'react'

function AuthLayouts({children}) {
  return (
    <>
        <header className=' flex items-center justify-center text-3xl font-extrabold p-4 shadow-xl
        '>DS CHATs</header>
        
        {children}
    </>
  )
}

export default AuthLayouts