import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            className='min-h-screen w-full flex items-center justify-center bg-cover bg-no-repeat'
            style={{ backgroundImage: "url('./images/auth-bg.png')" }}
        >
            {children}
        </div>
    )
}

export default AuthLayout