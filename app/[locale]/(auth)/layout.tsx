import { AppHeader } from '@/components/layouts/app-header'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (

        <>
            <AppHeader />
            <div
                className='flex items-center justify-center min-h-screen w-full bg-cover bg-no-repeat'
                style={{ backgroundImage: "url('./images/auth-bg.png')" }}
            >
                {children}
            </div>
        </>
    )
}

export default AuthLayout